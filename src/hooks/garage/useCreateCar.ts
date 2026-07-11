import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCar } from '@/api/garage';
import { useGetGaragePage } from '@/store';

export const createCarMutationOptions = {
  mutationFn: ({ name, color }: { name: string; color: string }) => createCar(name, color),
  onError: (error: unknown) => {
    console.error('Failed to create car:', error);
  },
};

export function useCreateCar() {
  const queryClient = useQueryClient();
  const currentPage = useGetGaragePage();

  return useMutation({
    ...createCarMutationOptions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', currentPage] });
    },
  });
}

export function useCreateCarSilent() {
  return useMutation(createCarMutationOptions);
}
