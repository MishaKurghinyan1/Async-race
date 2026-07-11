import type { ListItemProps } from '@/types';

import styles from './ListItem.module.css';

import Car from '@/assets/images/car.svg?react';

export function ListItem({ no, car, carName, raceCount, fastestRace }: ListItemProps) {
  return (
    <div className={styles.listItem}>
      <p className={styles.itemDescription}>{no}</p>
      <p className={styles.itemDescription}>
        <Car fill={car.color} width={50} />
      </p>
      <p className={styles.itemDescription}>{carName}</p>
      <p className={styles.itemDescription}>{raceCount}</p>
      <p className={styles.itemDescription}>{fastestRace}</p>
    </div>
  );
}
