import type { ListItemProps } from '@/types';

import styles from './ListItem.module.css';

import Car from '@/assets/images/car.svg?react';

export function ListItem({ no, car, carName, raceCount, fastestRace }: ListItemProps) {
  return (
    <div className={styles.listItem}>
      <h2 className={styles.itemDescription}>{no}</h2>
      <h2 className={styles.itemDescription}>
        <Car fill={car.color} width={50} />
      </h2>
      <h2 className={styles.itemDescription}>{carName}</h2>
      <h2 className={styles.itemDescription}>{raceCount}</h2>
      <h2 className={styles.itemDescription}>{fastestRace}</h2>
    </div>
  );
}
