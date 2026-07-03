import { useSearchParams } from 'react-router-dom';

import Frame from '../Frame/Frame';
import { ListItem } from '../ListItem';

import WinnersIMG from '@/assets/images/icons/winners.webp';

import { useWinnersWithCars } from '@/hooks/winners/useWinnersWithCars';

import styles from './Winners.module.css';
import type { SortOrderType, SortType } from '@/types';
import { formatTime } from '@/utils';

export function Winners() {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page') ?? '1');
  const sortBy = (searchParams.get('sort') ?? 'wins') as SortType;
  const sortOrder = (searchParams.get('order') ?? 'DESC') as SortOrderType;

  const {
    data: winnersData,
    isLoading,
    isError,
    error,
  } = useWinnersWithCars(page, sortBy, sortOrder);

  const totalCount = winnersData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT) || 1;
  const isLastPage = page * LIMIT >= totalCount;

  const updateUrlParams = (newParams: { page?: number; sort?: string; order?: string }) => {
    setSearchParams({
      page: String(newParams.page ?? page),
      sort: newParams.sort ?? sortBy,
      order: newParams.order ?? sortOrder,
    });
  };

  const handleSort = (field: SortType) => {
    let nextOrder: SortOrderType = 'DESC';
    if (sortBy === field) {
      nextOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      nextOrder = field === 'wins' ? 'DESC' : 'ASC';
    }

    // STRESS-TEST FIX: Always jump back to page 1 when sorting criteria alters
    updateUrlParams({ page: page, sort: field, order: nextOrder });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <Frame>
      <article className={styles.winners}>
        <article className={styles.heading}>
          <img src={WinnersIMG} alt="Winners" />
          <h1 className={styles.headingText}>Winners</h1>
        </article>
        <article className={styles.content}>
          <div className={styles.titles}>
            <button className={styles.title}>
              <h2 className={`${styles.title} ${styles.sortable}`} onClick={() => handleSort('id')}>
                № {sortBy === 'id' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </h2>
            </button>
            <h2 className={styles.title}>Car</h2>
            <h2 className={styles.title}>Car Name</h2>

            <button className={styles.title}>
              <h2
                className={`${styles.title} ${styles.sortable}`}
                onClick={() => handleSort('wins')}
              >
                Wins {sortBy === 'wins' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </h2>
            </button>
            <button className={styles.title}>
              <h2
                className={`${styles.title} ${styles.sortable}`}
                onClick={() => handleSort('time')}
              >
                Fastest Race {sortBy === 'time' && (sortOrder === 'ASC' ? '▲' : '▼')}
              </h2>
            </button>
          </div>
          <div className={styles.list}>
            {!winnersData || winnersData.winners.length === 0 ? (
              <div className={styles.noWinners}>
                <h2>No winners yet.</h2>
              </div>
            ) : (
              <>
                {winnersData.winners.map((winner) => (
                  <ListItem
                    key={winner.id}
                    no={winner.id}
                    car={{ color: winner.carColor }}
                    carName={winner.carName}
                    raceCount={winner.wins}
                    fastestRace={formatTime(winner.time)}
                  />
                ))}
              </>
            )}
          </div>
        </article>
      </article>
      <article className={styles.nav}>
        <button
          onClick={() => updateUrlParams({ page: Math.max(page - 1, 1) })}
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
          onClick={() => updateUrlParams({ page: Math.min(page + 1, totalPages) })}
          disabled={isLastPage}
          className={styles['turn-page']}
        >
          &#62;
        </button>
      </article>
    </Frame>
  );
}
