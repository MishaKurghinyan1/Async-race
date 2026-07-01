import { useSearchParams } from 'react-router-dom';

import Frame from '../Frame/Frame';
import { ListItem } from '../ListItem';

import WinnersIMG from '@/assets/images/icons/winners.png';

import { useWinnersWithCars } from '@/hooks/winners/useWinnersWithCars';

import styles from './Winners.module.css';

export function Winners() {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. EXTRACT STATE DIRECTLY FROM URL (Fallbacks safely typecast values)
  const page = Number(searchParams.get('page') ?? '1');
  const sortBy = (searchParams.get('sort') ?? 'wins') as 'id' | 'wins' | 'time';
  const sortOrder = (searchParams.get('order') ?? 'DESC') as 'ASC' | 'DESC';

  const {
    data: winnersData,
    isLoading,
    isError,
    error,
  } = useWinnersWithCars(page, sortBy, sortOrder);

  const totalCount = winnersData?.totalCount ?? 0;
  const totalPages = Math.ceil(totalCount / LIMIT) || 1;
  const isLastPage = page * LIMIT >= totalCount;

  // Helper function to update parameters fluidly without wiping other URL keys
  const updateUrlParams = (newParams: { page?: number; sort?: string; order?: string }) => {
    setSearchParams({
      page: String(newParams.page ?? page),
      sort: newParams.sort ?? sortBy,
      order: newParams.order ?? sortOrder,
    });
  };

  const handleSort = (field: 'wins' | 'time') => {
    let nextOrder: 'ASC' | 'DESC' = 'DESC';
    if (sortBy === field) {
      nextOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    } else {
      nextOrder = field === 'wins' ? 'DESC' : 'ASC';
    }

    // STRESS-TEST FIX: Always jump back to page 1 when sorting criteria alters
    updateUrlParams({ page: 1, sort: field, order: nextOrder });
  };

  // FIX 1: Guard clause execution order corrected. Check lifecycle flags first.
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!winnersData || winnersData.winners.length === 0) return <div>No winners yet.</div>;

  return (
    <Frame>
      <article className={styles.winners}>
        <article className={styles.heading}>
          <img src={WinnersIMG} alt="Winners" />
          <h1 className={styles.headingText}>Winners</h1>
        </article>
        <article className={styles.content}>
          <div className={styles.titles}>
            <h2 className={styles.title}>Position</h2>
            <h2 className={styles.title}>Car</h2>
            <h2 className={styles.title}>Car Name</h2>

            {/* FIX 2: Wired up sorting click events on correct columns */}
            <h2 className={`${styles.title} ${styles.sortable}`} onClick={() => handleSort('wins')}>
              Race Count {sortBy === 'wins' && (sortOrder === 'ASC' ? '▲' : '▼')}
            </h2>
            <h2 className={`${styles.title} ${styles.sortable}`} onClick={() => handleSort('time')}>
              Fastest Race {sortBy === 'time' && (sortOrder === 'ASC' ? '▲' : '▼')}
            </h2>
          </div>
          <div className={styles.list}>
            {winnersData.winners.map((winner, index) => (
              <ListItem
                key={winner.id}
                // FIX 3: Factored in pagination index offsets globally
                position={(page - 1) * LIMIT + index + 1}
                car={{ color: winner.carColor }}
                carName={winner.carName}
                raceCount={winner.wins}
                fastestRace={`${Math.floor(winner.time / 60)}:${(winner.time % 60).toString().padStart(2, '0')}`}
              />
            ))}
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
