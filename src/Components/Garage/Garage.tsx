import { Road } from '../Road';
import styles from './Garage.module.css';

export function Garage() {
  return (
    <>
      <section className={styles['full-race']}>
        <article className={styles['race']}>
          <article className={styles['race-container']}>
            <article className={styles.roads}>
              <Road />
              <Road />
              <Road />
              <Road />
            </article>
            <article className={styles['finish-line']}></article>
          </article>
        </article>
        <article className={styles.nav}>
          <p
            onClick={() => {
              /* ----------------- */
            }}
            className={styles['turn-page']}
          >
            &#60;
          </p>
          <p>PAGES</p>
          <p
            onClick={() => {
              /* ----------------- */
            }}
            className={styles['turn-page']}
          >
            &#62;
          </p>
        </article>
      </section>
    </>
  );
}
