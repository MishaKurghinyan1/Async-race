import axios from 'axios';

export const isHttpError = (error: unknown, status: number): boolean => {
  return axios.isAxiosError(error) && error.response?.status === status;
};
