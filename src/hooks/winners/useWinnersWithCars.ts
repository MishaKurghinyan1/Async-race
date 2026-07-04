// useWinnersWithCars.ts
import { useQuery } from '@tanstack/react-query';
import { getWinners } from '@/api/winners/winners.api';
import { fetchAllCars } from '@/api/garage/garage.api';
import type { SortOrderType, SortType } from '@/types';
import { useMemo } from 'react';

export function useWinnersWithCars(page: number, sortBy: SortType, sortOrder: SortOrderType) {
  const winnersQuery = useQuery({
    queryKey: ['winners', page, sortBy, sortOrder],
    queryFn: () => getWinners(page, sortBy, sortOrder),
  });

  const carsQuery = useQuery({
    queryKey: ['garage-all'],
    queryFn: fetchAllCars,
    staleTime: 60_000, // cars list doesn't need refetching every time you paginate/sort winners
  });

  const isLoading = winnersQuery.isLoading || carsQuery.isLoading;
  const isError = winnersQuery.isError || carsQuery.isError;
  const error = winnersQuery.error ?? carsQuery.error;

  const data = useMemo(() => {
    if (!winnersQuery.data || !carsQuery.data) return undefined;

    const carMap = new Map(carsQuery.data.map((car) => [car.id, car]));
    const detailedWinners = winnersQuery.data.winners.map((winner) => {
      const car = carMap.get(winner.id);
      return {
        ...winner,
        carName: car?.name ?? 'Unknown Car',
        carColor: car?.color ?? '#000000',
      };
    });

    return { winners: detailedWinners, totalCount: winnersQuery.data.totalCount };
  }, [winnersQuery.data, carsQuery.data]);

  return { data, isLoading, isError, error };
}
