import { api } from '../client';
import type { Car, FetchCarsResponse } from '@/interfaces';
import { deleteWinner } from '../winners/winners.api';

export const fetchCars = async (page: number, limit = 7): Promise<FetchCarsResponse> => {
  const response = await api.get<Car[]>('/garage', {
    params: {
      _page: page,
      _limit: limit,
    },
  });

  const totalCount = response.headers['x-total-count'];

  return {
    cars: response.data,
    totalCount: totalCount ? parseInt(totalCount as string, 10) : 0,
  };
};

export const createCar = async (name: string, color: string): Promise<Car> => {
  const { data } = await api.post<Car>('/garage', { name, color });
  return data;
};

export const updateCar = async (id: number, name: string, color: string): Promise<void> =>
  await api.put(`/garage/${id}`, { name, color });

export const deleteCar = async (id: number): Promise<void> => {
  try {
    let winnerExists = false;
    try {
      await deleteWinner(id);
      winnerExists = true;
    } catch (error) {
      return;
    }

    const promises: Promise<any>[] = [api.delete(`/garage/${id}`)];

    if (winnerExists) {
      promises.push(deleteWinner(id));
    }

    const [garageResult, winnerResult] = await Promise.allSettled(promises);

    if (garageResult.status === 'rejected') {
      throw new Error(`Failed to delete car: ${garageResult.reason}`);
    }

    if (winnerResult && winnerResult.status === 'rejected') {
      console.error('Winner cleanup encountered a critical issue:', winnerResult.reason);
      throw winnerResult.reason;
    }
  } catch (error) {
    console.error('Fatal error in cascade deletion workflow:', error);
    throw error;
  }
};
