import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCar } from '@/api/garage/garage.api';
import { useGetGaragePage } from '@/store';

export function useCreateCar() {
  const queryClient = useQueryClient();
  const currentPage = useGetGaragePage();

  return useMutation({
    mutationFn: ({ name, color }: { name: string; color: string }) => createCar(name, color),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', currentPage] });
    },
    onError: (error) => {
      console.error('Failed to create car:', error);
    },
  });
}
