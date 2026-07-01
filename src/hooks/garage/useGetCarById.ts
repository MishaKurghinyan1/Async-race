import { useQuery } from '@tanstack/react-query';
import { fetchCarById } from '@/api/garage/garage.api';

export const useGetCarById = (id: number) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id),
  });
};
