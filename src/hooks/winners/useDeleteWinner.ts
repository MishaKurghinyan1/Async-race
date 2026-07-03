import { useMutation } from '@tanstack/react-query';
import { deleteWinner } from '@/api/winners/winners.api';

export const deleteWinnerMutationOptions = {
  mutationFn: (id: number) => deleteWinner(id),
  onError: (error: unknown) => {
    console.error('Failed to create winner:', error);
  },
};

export function useDeleteWinnerSilent() {
  return useMutation(deleteWinnerMutationOptions);
}
