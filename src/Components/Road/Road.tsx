import React from 'react';
import type { JSX } from 'react/jsx-runtime';
import styles from './Road.module.css';
import Delete from '@/assets/images/icons/delete.svg?react';
import Start from '@/assets/images/icons/start.svg?react';
import Select from '@/assets/images/icons/select.svg?react';
import Stop from '@/assets/images/icons/stop.svg?react';
import CarImg from '@/assets/images/car.svg?react';
import roadIMG from '@/assets/images/road.jpg';

import type { RoadProps } from '@/types';
import { useDeleteCar } from '@/hooks/garage';

export const Road = React.memo(function Road({
  id,
  name,
  color,
  carsRefMap,
  setSelected,
}: RoadProps): JSX.Element {
  const { mutate: deleteCar } = useDeleteCar();
  const wh = 16;

  return (
    <div className={styles.road}>
      <div className={styles['controll-buttons']}>
        <div className={styles['crud-buttons']}>
          <button className={styles['controll-button']}>
            <Select
              width={wh}
              height={wh}
              onClick={() => {
                setSelected({ id, name });
              }}
            />
          </button>
          <button className={styles['controll-button']}>
            <Delete width={wh} height={wh} onClick={() => deleteCar(id)} />
          </button>
        </div>
        <div className={styles['race-buttons']}>
          <button className={styles['controll-button']} onClick={() => handleStart(id)}>
            <Start width={wh} height={wh} />
          </button>
          <button className={styles['controll-button']} onClick={() => handleStop(id)}>
            <Stop width={wh} height={wh} />
          </button>
        </div>
      </div>
      <div className={styles.path}>
        <div className={styles.raceroad} style={{ backgroundImage: `url(${roadIMG})` }}>
          <div
            className={styles.start}
            ref={(element) => {
              if (element) {
                carsRefMap.current.set(id, element);
              } else {
                carsRefMap.current.delete(id);
              }
            }}
            id={id.toString()}
          >
            <CarImg className={styles.car} fill={color} stroke={color} strokeWidth={10} />
          </div>
          <p>{name}</p>
        </div>
      </div>
    </div>
  );
});

function handleStart(id: number) {
  const car = document.getElementById(id.toString());
  car!.style.transition = 'left 1s ease-in-out';
  car!.style.left = '100%';
}

function handleStop(id: number) {
  const car = document.getElementById(id.toString());
  car!.style.transition = 'none';
  car!.style.left = '0%';
}
