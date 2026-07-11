import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCar } from '@/api/garage';
import { useGetGaragePage } from '@/store';

export function useUpdateCar() {
  const queryClient = useQueryClient();
  const currentPage = useGetGaragePage();

  return useMutation({
    mutationFn: ({ id, name, color }: { id: number; name: string; color: string }) =>
      updateCar(id, name, color),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', currentPage] });
    },
    onError: (error) => {
      console.error('Failed to update car:', error);
    },
  });
}
