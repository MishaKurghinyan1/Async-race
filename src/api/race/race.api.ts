import { api } from '../client';
import type { StartResponse } from '@/types';

export const startRace = async (id: number, signal?: AbortSignal): Promise<StartResponse> => {
  const response = await api.patch<StartResponse>('/engine', null, {
    params: { id, status: 'started' },
    signal,
  });
  return response.data;
};

export const stopRace = async (id: number, signal?: AbortSignal): Promise<StartResponse> => {
  const response = await api.patch<StartResponse>('/engine', null, {
    params: { id, status: 'stopped' },
    signal,
  });
  return response.data;
};

export const switchToDrive = async (id: number, signal?: AbortSignal): Promise<any> => {
  const response = await api.patch<any>('/engine', null, {
    params: { id, status: 'drive' },
    signal,
    timeout: 0,
  });
  return response.data;
};
