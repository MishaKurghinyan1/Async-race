import { api } from '../client';
import type { Car, FetchWinnersResponse, Winner } from '@/interfaces';

export const getWinnersWithCars = async (
  page: number,
  sortBy: 'id' | 'wins' | 'time',
  sortOrder: 'ASC' | 'DESC',
  limit = 10,
): Promise<FetchWinnersResponse> => {
  const response = await api.get<Winner[]>('/winners', {
    params: {
      _page: page,
      _limit: limit,
      _sort: sortBy,
      _order: sortOrder,
    },
  });

  const totalCount = Number(response.headers['x-total-count'] ?? 0);

  const { data: allCars } = await api.get<Car[]>('/garage');
  const carMap = new Map(allCars.map((car) => [car.id, car]));

  const detailedWinners = response.data.map((winner) => {
    const car = carMap.get(winner.id);
    return {
      ...winner,
      carName: car?.name ?? 'Unknown Car',
      carColor: car?.color ?? '#000000',
    };
  });

  return { winners: detailedWinners, totalCount };
};
