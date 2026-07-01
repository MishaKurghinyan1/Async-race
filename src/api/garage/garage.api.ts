import { api } from '../client';
import type { Car, FetchCarsResponse } from '@/interfaces';

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

export const fetchCarById = async (id: number): Promise<Car> => {
  const { data } = await api.get<Car>(`/garage/${id}`);
  return data;
};

export const createCar = async (name: string, color: string): Promise<Car> => {
  const { data } = await api.post<Car>('/garage', { name, color });
  return data;
};

export const updateCar = async (id: number, name: string, color: string): Promise<void> =>
  await api.put(`/garage/${id}`, { name, color });

export const deleteCar = async (id: number): Promise<void> => await api.delete(`/garage/${id}`);
