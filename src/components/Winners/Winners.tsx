import { useSearchParams } from 'react-router-dom';

import { useEffect } from 'react';

import styles from './Winners.module.css';
import Frame from '../Frame/Frame';
import { ListItem } from '../ListItem';

import WinnersIMG from '@/assets/images/icons/winners.webp';
import loadingVideo from '@/assets/videos/loading.webm';

import { useWinnersWithCars } from '@/hooks/winners';

import type { SortOrderType, SortType } from '@/types';

import { formatTime, isSortOrderType, isSortType } from '@/utils';
import { useGetSize } from '@/store';

export function Winners() {
  const LIMIT = 10;
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = Number(searchParams.get('page'));
  const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  const rawSort = searchParams.get('sort');
  const sortBy: SortType = isSortType(rawSort) ? rawSort : 'wins';

  const rawOrder = searchParams.get('order');
  const sortOrder: SortOrderType = isSortOrderType(rawOrder) ? rawOrder : 'DESC';

  const size = useGetSize();

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

    updateUrlParams({ page: page, sort: field, order: nextOrder });
  };

  const getSortIndicator = (field: SortType) => {
    if (sortBy !== field) return null;
    return sortOrder === 'ASC' ? '▲' : '▼';
  };

  useEffect(() => {
    if (winnersData && page > totalPages) {
      updateUrlParams({ page: totalPages });
    }
  }, [winnersData, page, totalPages]);

  if (isLoading)
    return (
      <div className="video-loading-container">
        <video src={loadingVideo} autoPlay loop muted playsInline width={size} height={size} />
      </div>
    );
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <Frame>
      <div className={styles.winners}>
        <div className={styles.heading}>
          <img src={WinnersIMG} alt="Winners" />
          <h1 className={styles.headingText}>Winners</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.titles}>
            <button className={styles.title} onClick={() => handleSort('id')}>
              <span className={`${styles.title} ${styles.sortable}`}>
                № {getSortIndicator('id')}
              </span>
            </button>
            <span className={styles.title}>Car</span>
            <span className={styles.title}>Car Name</span>

            <button className={styles.title} onClick={() => handleSort('wins')}>
              <span className={`${styles.title} ${styles.sortable}`}>
                Wins {getSortIndicator('wins')}
              </span>
            </button>
            <button className={styles.title} onClick={() => handleSort('time')}>
              <span className={`${styles.title} ${styles.sortable}`}>
                Fastest Race {getSortIndicator('time')}
              </span>
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
        </div>
      </div>
      <div className={styles.nav}>
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
      </div>
    </Frame>
  );
}
