import { api } from '../client';
import type { Car, FetchWinnersResponse, Winner } from '@/interfaces';
import type { SortOrderType, SortType } from '@/types';
import { isHttpError } from '@/utils';

export const getWinnersWithCars = async (
  page: number,
  sortBy: SortType,
  sortOrder: SortOrderType,
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

export const getWinnerById = async (id: number): Promise<Winner | null> => {
  try {
    const { data } = await api.get<Winner>(`/winners/${id}`);
    return data;
  } catch (error) {
    if (isHttpError(error, 404)) return null;
    throw error;
  }
};

export const createWinner = async (winner: Winner): Promise<void> => {
  try {
    const existingWinner = await getWinnerById(winner.id);

    if (existingWinner) {
      await updateWinner(winner.id, winner.time);
    } else {
      await api.post('/winners', winner);
    }
  } catch (error) {
    console.error('Error creating winner:', error);
    throw error;
  }
};

export const deleteWinner = async (id: number): Promise<void> => {
  try {
    await api.delete(`/winners/${id}`);
  } catch (error) {
    if (!isHttpError(error, 404)) {
      console.error('Error deleting winner:', error);
      throw error;
    }
  }
};

export const updateWinner = async (id: number, time: number): Promise<void> => {
  try {
    const existingWinner = await getWinnerById(id);

    if (!existingWinner) {
      await api.post('/winners', { id, time, wins: 1 });
      return;
    }

    const wins = existingWinner.wins + 1;
    const bestTime = Math.min(existingWinner.time, time);

    await api.patch(`/winners/${id}`, { wins, time: bestTime });
  } catch (error) {
    console.error('Error updating winner:', error);
    throw error;
  }
};
