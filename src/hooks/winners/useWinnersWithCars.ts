import { useQuery } from '@tanstack/react-query';
import { getWinnersWithCars } from '@/api/winners/winners.api';
import type { SortOrderType, SortType } from '@/types';

export function useWinnersWithCars(page: number, sortBy: SortType, sortOrder: SortOrderType) {
  return useQuery({
    queryKey: ['winners-detailed', page, sortBy, sortOrder],
    queryFn: () => getWinnersWithCars(page, sortBy, sortOrder),
  });
}
