import { useQuery } from '@tanstack/react-query';
import { fetchCars } from '@/api/garage/garage.api';

export const useCars = (page: number) => {
  return useQuery({
    queryKey: ['cars', page],
    queryFn: () => fetchCars(page),
  });
};
