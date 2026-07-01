import * as CarNames from '@/data/cars.mock.json';

import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useGetGaragePage, useTurnGaragePage } from '@/store';

import { useCars, useCreateCar, useUpdateCar } from '@/hooks/garage';

import { Road } from '../Road';
import Frame from '../Frame/Frame';
import { TextInput } from '../TextInput';

import type { Car } from '@/interfaces';

import styles from './Garage.module.css';

import { getRandomHexColor, getRandomInt } from '@/utils';

const pool: readonly string[] = CarNames.cars;

export function Garage() {
  const carsRefMap = useRef<Map<number, HTMLDivElement | null>>(new Map());

  const [selectedCar, setSelectedCar] = useState<{ id: number; name: string } | null>(null);

  const [createName, setCreateName] = useState('');
  const [createColor, setCreateColor] = useState('#ff0000');
  const [updateName, setUpdateName] = useState('');
  const [updateColor, setUpdateColor] = useState('#f00');

  const page = useGetGaragePage();
  const { data, isLoading, isError, error } = useCars(page);
  const queryClient = useQueryClient();
  const { mutate: create, isPending } = useCreateCar();
  const { mutate: update, isPending: isUpdating } = useUpdateCar();

  const LIMIT = 7;
  const turnPage = useTurnGaragePage();
  const totalCount = data?.totalCount ?? 0;
  const isLastPage = page * LIMIT >= totalCount;
  const totalPages = Math.ceil(totalCount / LIMIT);

  useEffect(() => {
    if (!isLoading && data && data.cars.length === 0 && page > 1) {
      turnPage(-1);
    }
  }, [data, isLoading, page, turnPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const handleCreateClick = () => {
    if (!createName.trim()) return;

    create(
      { name: createName, color: createColor },
      {
        onSuccess: () => {
          setCreateName('');
        },
        onError: (error) => {
          alert(`Failed to build car: ${error.message}`);
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

  const handleStartAll = () => {
    carsRefMap.current.forEach((element, id) => {
      if (element) {
        const car = data?.cars.find((car: Car) => car.id === id);
        if (car) {
          const duration = 8;
          element.style.transition = `left ${duration}s ease-in-out`;
          element.style.left = '100%';
        }
      }
    });
  };

  const handleStopAll = () => {
    carsRefMap.current.forEach((element, id) => {
      if (element) {
        const car = data?.cars.find((car: Car) => car.id === id);
        if (car) {
          element.style.transition = `none`;
          element.style.left = '0%';
        }
      }
    });
  };

  const handleGenerateCars = async () => {
    for (let i = 0; i < 100; i++) {
      const randomName = pool[getRandomInt(0, pool.length - 1)];
      const randomColor = getRandomHexColor();
      try {
        await create({ name: randomName, color: randomColor }, { onSuccess: undefined });
        // or better: a version of the mutation with invalidation disabled
      } catch (e) {
        console.error(e);
      }
    }
    queryClient.invalidateQueries({ queryKey: ['cars'] }); // single invalidation at the end
  };

  return (
    <>
      <section className={styles['full-race']}>
        <div className={styles.inputsContainer}>
          <div className={styles.racingButtons}>
            <button className={styles.button} onClick={handleStartAll}>
              Start
            </button>
            <button className={styles.button} onClick={handleStopAll}>
              Stop
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
          <button className={styles.button + ' ' + styles.generate} onClick={handleGenerateCars}>
            Generate Cars
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
              PAGE: {page}/{totalPages}
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
