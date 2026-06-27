import styles from './Road.module.css';
import Delete from '@/assets/IMGs/delete.svg?react';
import Start from '@/assets/IMGs/start.svg?react';
import Select from '@/assets/IMGs/select.svg?react';
import Stop from '@/assets/IMGs/stop.svg?react';
import Car from '@/assets/IMGs/car.svg?react';
import roadIMG from '@/assets/IMGs/road.jpg';

export function Road() {
  return (
    <div className={styles.road}>
      <div className={styles['controll-buttons']}>
        <div className={styles['crud-buttons']}>
          <button className={styles['controll-button']}>
            <Select width={16} height={16} />
          </button>
          <button className={styles['controll-button']}>
            <Delete width={16} height={16} />
          </button>
        </div>
        <div className={styles['race-buttons']}>
          <button className={styles['controll-button']}>
            <Start width={16} height={16} />{' '}
          </button>
          <button className={styles['controll-button']}>
            <Stop width={16} height={16} />
          </button>
        </div>
      </div>
      <div className={styles.path}>
        <div
          className={styles.start}
          style={{ backgroundImage: `url(${roadIMG})` }}
        >
          <Car width={35} height={50} fill="white" />
        </div>
        <div
          className={styles.raceroad}
          style={{ backgroundImage: `url(${roadIMG})` }}
        >
          <p>Car name</p>
        </div>
      </div>
    </div>
  );
}
