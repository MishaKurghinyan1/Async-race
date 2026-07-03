import * as CarNames from '@/data/cars.mock.json';

import { useEffect, useMemo, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useGetGaragePage, useTurnGaragePage } from '@/store';

import { useCars, useCreateCar, useUpdateCar } from '@/hooks/garage';

import { Road } from '../Road';
import Frame from '../Frame/Frame';
import { TextInput } from '../TextInput';

import type { Car } from '@/interfaces';

import styles from './Garage.module.css';

import { getRandomHexColor, getRandomInt } from '@/utils';
import { useDriveEngine, useStartEngine, useStopEngine } from '@/hooks/race/useRace';
import { driveSingleCar } from '@/utils/start.drive.util';

import { useCreateWinnerSilent } from '@/hooks/winners';

const pool: readonly string[] = CarNames.cars;

export function Garage() {
  const animationsRef = useRef<Map<number, Animation>>(new Map());
  const abortControllersRef = useRef<Map<number, AbortController>>(new Map());
  const stopRequestedRef = useRef(false);

  const { mutateAsync: stopEngine } = useStopEngine();

  const [isRacing, setIsRacing] = useState(false);
  const [winner, setWinner] = useState<{ id: number; name: string; time: number } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const carsRefMap = useRef<Map<number, HTMLDivElement | null>>(new Map());

  const [selectedCar, setSelectedCar] = useState<{ id: number; name: string } | null>(null);

  const [createName, setCreateName] = useState('');
  const [createColor, setCreateColor] = useState('#ff0000');
  const [updateName, setUpdateName] = useState('');
  const [updateColor, setUpdateColor] = useState('#f00');

  const page = useGetGaragePage();
  const { data, isLoading, isError, error } = useCars(page);
  const queryClient = useQueryClient();
  const { mutateAsync: createAsync, isPending } = useCreateCar();
  const { mutate: update, isPending: isUpdating } = useUpdateCar();

  const { mutateAsync: createWinnerSilent } = useCreateWinnerSilent();

  const { mutateAsync: startEngineMutation } = useStartEngine();
  const { mutateAsync: driveEngineMutation } = useDriveEngine();

  const LIMIT = 7;
  const turnPage = useTurnGaragePage();
  const totalCount = data?.totalCount ?? 0;
  const isLastPage = useMemo(() => page * LIMIT >= totalCount, [page, LIMIT, totalCount]);
  const totalPages = useMemo(() => Math.ceil(totalCount / LIMIT), [totalCount, LIMIT]);

  useEffect(() => {
    if (!isLoading && data && data.cars.length === 0 && page > 1) {
      turnPage(-1);
    }
  }, [data, isLoading, page, turnPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleCreateClick = () => {
    if (!createName.trim()) return;

    createAsync(
      { name: createName, color: createColor },
      {
        onSuccess: () => {
          setCreateName('');
        },
        onError: (error: any) => {
          alert(`Failed to build car: ${error.message || 'Unknown error'}`);
        },
      },
    );
  };

  const handleUpdateClick = () => {
    if (selectedCar === null) {
      alert('Please select a car to update.');
      return;
    }
    update(
      {
        id: selectedCar.id,
        name: updateName.trim() ? updateName : selectedCar.name,
        color: updateColor,
      },
      {
        onSuccess: () => {
          setUpdateName('');
        },
        onError: (error) => {
          alert(`Failed to update car: ${error.message}`);
        },
      },
    );
  };

  const handleStartGlobalRace = async () => {
    if (!data?.cars || data.cars.length === 0) return;

    // Stop any single car races before starting global race
    stopRequestedRef.current = true;
    abortControllersRef.current.forEach((controller) => controller.abort());
    abortControllersRef.current.clear();
    animationsRef.current.forEach((anim) => {
      anim.cancel();
      anim.finish();
    });
    animationsRef.current.clear();

    data?.cars.forEach((car) => {
      stopEngine({ id: car.id }).catch(() => {});
    });

    carsRefMap.current.forEach((element) => {
      if (element) {
        element.style.transition = 'none';
        element.style.transform = 'translateX(0%)';
        element.offsetHeight;
        element.style.animation = 'none';
      }
    });

    // Reset state for new race
    stopRequestedRef.current = false;
    setWinner(null);
    setIsRacing(true);

    // Defer the heavy work to allow UI to update first
    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const raceTasks = data.cars.map((car) => {
        const controller = new AbortController();
        abortControllersRef.current.set(car.id, controller);

        return driveSingleCar(
          car.id,
          (args) => startEngineMutation(args),
          (args) => driveEngineMutation(args),
          controller,
          (id, anim) => animationsRef.current.set(id, anim),
        );
      });

      const results = await Promise.all(raceTasks);

      if (stopRequestedRef.current) {
        return;
      }

      const successfulFinishers = results.filter((res) => res.success && res.time !== Infinity);
      if (successfulFinishers.length === 0) return;

      successfulFinishers.sort((a, b) => a.time - b.time);
      const winnerRecord = successfulFinishers[0];
      const winningCarDetails = data.cars.find((car) => car.id === winnerRecord.carId);

      if (winningCarDetails) {
        const finalTime = parseFloat(winnerRecord.time.toFixed(2));
        setWinner({ id: winningCarDetails.id, name: winningCarDetails.name, time: finalTime });
        createWinnerSilent(
          { id: winningCarDetails.id, time: finalTime, wins: 1 },
          {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ['winners-detailed'] });
            },
          },
        ).catch((e) => console.error('Failed to save winner:', e));
      }

      // Reset all car positions after race completes
      animationsRef.current.forEach((anim) => {
        anim.cancel();
      });
      animationsRef.current.clear();

      carsRefMap.current.forEach((element) => {
        if (element) {
          element.style.transition = 'none';
          element.style.transform = 'translateX(0%)';
          // Force reflow to ensure the transform is applied
          element.offsetHeight;
        }
      });
    } finally {
      setIsRacing(false);
    }
  };

  const handleStopAll = () => {
    stopRequestedRef.current = true;

    abortControllersRef.current.forEach((controller) => controller.abort());
    abortControllersRef.current.clear();

    animationsRef.current.forEach((anim) => {
      anim.cancel();
      anim.finish();
    });
    animationsRef.current.clear();

    data?.cars.forEach((car) => {
      stopEngine({ id: car.id }).catch(() => {});
    });

    carsRefMap.current.forEach((element) => {
      if (element) {
        element.style.transition = 'none';
        element.style.transform = 'translateX(0%)';
        // Force reflow to ensure the transform is applied
        element.offsetHeight;
        // Remove any animation-related styles
        element.style.animation = 'none';
      }
    });

    setIsRacing(false);
  };

  const handleGenerateCars = async () => {
    setIsGenerating(true);
    const carsToCreate = Array.from({ length: 100 }).map(() => ({
      name: pool[getRandomInt(0, pool.length - 1)],
      color: getRandomHexColor(),
    }));

    const chunkSize = 5;
    for (let i = 0; i < carsToCreate.length; i += chunkSize) {
      const chunk = carsToCreate.slice(i, i + chunkSize);

      await Promise.all(
        chunk.map((car) => createAsync(car).catch((e) => console.error('Silent fail:', e))),
      );

      // Allow UI to update between chunks
      await new Promise((resolve) => setTimeout(resolve, 0));
    }

    queryClient.invalidateQueries({ queryKey: ['cars', page] });
    setIsGenerating(false);
  };
  return (
    <>
      {!!winner ? (
        <div className={styles.winnerBox}>
          <h2>Winner is {winner.name}!</h2>
          <p>Time: {winner.time}</p>
          <button className={styles.closeButton} onClick={() => setWinner(null)}>
            X
          </button>
        </div>
      ) : null}
      <section className={styles['full-race']}>
        <div className={styles.inputsContainer}>
          <div className={styles.racingButtons}>
            <button className={styles.button} onClick={handleStartGlobalRace} disabled={isRacing}>
              Start
            </button>
            <button className={styles.button} onClick={handleStopAll}>
              Reset
            </button>
          </div>
          <div className={styles.editor}>
            <div className={styles.inputGroup}>
              <TextInput
                placeholder="Create car name"
                value={createName}
                onChange={setCreateName}
                disabled={isPending}
              />
              <input
                type="color"
                defaultValue={createColor}
                onChange={(e) => setCreateColor(e.target.value)}
                required
              />
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={handleCreateClick}
              disabled={isPending}
            >
              {isPending ? 'Creating...' : 'Create Car'}
            </button>
          </div>
          <div className={styles.editor}>
            <div className={styles.inputGroup}>
              <TextInput
                placeholder="Update car name"
                value={updateName}
                onChange={setUpdateName}
                disabled={isPending}
              />
              <input
                type="color"
                defaultValue={updateColor}
                onChange={(e) => setUpdateColor(e.target.value)}
                required
              />
            </div>
            <button className={styles.button} onClick={handleUpdateClick} disabled={isPending}>
              {isUpdating ? 'Updating...' : 'Update Car'}
            </button>
          </div>
          <button
            className={styles.button + ' ' + styles.generate}
            onClick={handleGenerateCars}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Cars'}
          </button>
        </div>

        <Frame>
          <article className={styles['race']}>
            <article className={styles['race-container']}>
              {data?.cars[0] ? (
                <>
                  <article className={styles.roads}>
                    {data.cars.map((car: Car) => (
                      <Road
                        key={car.id}
                        id={car.id}
                        name={car.name}
                        color={car.color}
                        setSelected={setSelectedCar}
                        carsRefMap={carsRefMap}
                      />
                    ))}
                  </article>
                  <article className={styles['finish-line']}></article>
                </>
              ) : (
                <div>
                  <h2 style={{ color: '#fff', textAlign: 'center' }}>No Cars</h2>
                </div>
              )}
            </article>
          </article>
          <article className={styles.nav}>
            <button
              onClick={() => turnPage(-1)}
              disabled={page === 1}
              className={styles['turn-page']}
            >
              &#60;
            </button>
            <p>
              PAGE: {page}/{Math.max(totalPages, 1)}
            </p>
            <button
              type="button"
              onClick={() => turnPage(1)}
              disabled={isLastPage || isLoading}
              className={styles['turn-page']}
            >
              &#62;
            </button>
          </article>
        </Frame>
      </section>
    </>
  );
}
