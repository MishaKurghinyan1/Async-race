import { useQuery } from '@tanstack/react-query';
import { getWinnersWithCars } from '@/api/winners/winners.api';

export function useWinnersWithCars(
  page: number,
  sortBy: 'id' | 'wins' | 'time',
  sortOrder: 'ASC' | 'DESC',
) {
  return useQuery({
    // Critical: Cache key must change dynamically when sorting changes
    queryKey: ['winners-detailed', page, sortBy, sortOrder],
    queryFn: () => getWinnersWithCars(page, sortBy, sortOrder),
  });
}
