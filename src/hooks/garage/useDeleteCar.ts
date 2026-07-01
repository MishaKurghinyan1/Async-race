import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCar } from '@/api/garage/garage.api';
import { useGetGaragePage } from '@/store';

export function useDeleteCar() {
  const queryClient = useQueryClient();
  const currentPage = useGetGaragePage();

  return useMutation({
    mutationFn: (id: number) => deleteCar(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', currentPage] });
    },
    onError: (error) => {
      console.error('Failed to delete car:', error);
    },
  });
}
