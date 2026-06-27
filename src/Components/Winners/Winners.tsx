import Frame from '../Frame/Frame';
import { ListItem } from '../ListItem';
import styles from './Winners.module.css';
import WinnersIMG from '@/assets/IMGs/winners.png';

export function Winners() {
  return (
    <Frame>
      <article className={styles.winners}>
        <article className={styles.heading}>
          <img src={WinnersIMG} alt="Winners" />
          <h1>Winners</h1>
        </article>
        <article className={styles.content}>
          <div className={styles.titles}>
            <h2 className={styles.title}>Position</h2>
            <h2 className={styles.title}>Car Name</h2>
            <h2 className={styles.title}>Race Count</h2>
            <h2 className={styles.title}>Fastest Race</h2>
          </div>
          <div className={styles.list}>
            <ListItem
              position={1}
              carName="BMW M3 GTR"
              raceCount={1242}
              fastestRace="1:02"
            />
          </div>
        </article>
      </article>
    </Frame>
  );
}
