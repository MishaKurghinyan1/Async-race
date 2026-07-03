import { useMutation } from '@tanstack/react-query';
import { createWinner } from '@/api/winners/winners.api';
import type { Winner } from '@/interfaces';

export const createWinnerMutationOptions = {
  mutationFn: ({ id, time, wins }: Winner) => createWinner({ id, wins, time }),
  onError: (error: unknown) => {
    console.error('Failed to create winner:', error);
  },
};

export function useCreateWinnerSilent() {
  return useMutation(createWinnerMutationOptions);
}
