import React, { memo, useCallback, useRef, useState } from 'react';
import type { JSX } from 'react/jsx-runtime';
import styles from './Road.module.css';
import Delete from '@/assets/images/icons/delete.svg?react';
import Start from '@/assets/images/icons/start.svg?react';
import Select from '@/assets/images/icons/select.svg?react';
import Stop from '@/assets/images/icons/stop.svg?react';
import CarImg from '@/assets/images/car.svg?react';
import roadIMG from '@/assets/images/road.webp';

import type { RoadProps } from '@/types';
import { useDeleteCar } from '@/hooks/garage';
import { useDeleteWinnerSilent } from '@/hooks/winners';
import { driveSingleCar } from '@/utils/start.drive.util';
import { useDriveEngine, useStartEngine, useStopEngine } from '@/hooks/race/useRace';

export const Road = memo(function Road({
  id,
  name,
  color,
  carsRefMap,
  setSelected,
}: RoadProps): JSX.Element {
  const animationRef = useRef<Animation | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const [isRacing, setIsRacing] = useState(false);

  const { mutate: deleteCar } = useDeleteCar();
  const wh = 16;
  const { mutateAsync: deleteWinnerSilentAsync } = useDeleteWinnerSilent();
  const startEngineMutation = useStartEngine();
  const driveEngineMutation = useDriveEngine();
  const stopEngineMutation = useStopEngine();

  const handleStart = useCallback(() => {
    setIsRacing(true);
    const controller = new AbortController();
    controllerRef.current = controller;

    requestIdleCallback(() => {
      driveSingleCar(
        id,
        (args) => startEngineMutation.mutateAsync(args),
        (args) => driveEngineMutation.mutateAsync(args),
        controller,
        (_id, anim) => {
          animationRef.current = anim;
        },
      );
    });
  }, [id, startEngineMutation, driveEngineMutation]);

  const setRoadRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element) {
        carsRefMap.current.set(id, element);
      } else {
        carsRefMap.current.delete(id);
      }
    },
    [id, carsRefMap],
  );

  const handleStop = useCallback(() => {
    const car = carsRefMap.current.get(id);
    if (car) {
      car.style.transition = 'none';
      car.style.transform = 'translateX(0%)';
    }
    controllerRef.current?.abort();
    controllerRef.current = null;

    animationRef.current?.cancel();
    animationRef.current = null;
    setIsRacing(false);

    stopEngineMutation.mutate({ id });
  }, [id, carsRefMap, stopEngineMutation]);

  const handleDelete = useCallback(() => {
    deleteCar(id);
    deleteWinnerSilentAsync(id).catch((e) =>
      console.error(`Failed to delete winner record for car ${id}:`, e),
    );
  }, [id, deleteCar, deleteWinnerSilentAsync]);

  const handleSelect = useCallback(() => {
    setSelected({ id, name });
  }, [id, name, setSelected]);

  return (
    <div className={styles.road}>
      <div className={styles['controll-buttons']}>
        <div className={styles['crud-buttons']}>
          <button className={styles['controll-button']} onClick={handleSelect}>
            <Select width={wh} height={wh} />
          </button>
          <button className={styles['controll-button']} onClick={handleDelete} disabled={isRacing}>
            <Delete width={wh} height={wh} />
          </button>
        </div>
        <div className={styles['race-buttons']}>
          <button className={styles['controll-button']} onClick={handleStart} disabled={isRacing}>
            <Start width={wh} height={wh} />
          </button>
          <button className={styles['controll-button']} onClick={handleStop}>
            <Stop width={wh} height={wh} />
          </button>
        </div>
      </div>
      <div className={styles.path}>
        <div className={styles.raceroad} style={{ backgroundImage: `url(${roadIMG})` }}>
          <div className={styles.start} ref={setRoadRef} id={id.toString()}>
            <CarImg className={styles.car} fill={color} stroke={color} strokeWidth={10} />
          </div>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
});
