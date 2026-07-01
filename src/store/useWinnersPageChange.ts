import type { PaginationState } from '@/interfaces';
import { create } from 'zustand';

const usePaginationStore = create<PaginationState>((set) => ({
  page: 1,

  turnPage: (offset) =>
    set((state) => ({
      page: Math.max(1, state.page + offset),
    })),

  setPage: (absolutePage) => set({ page: absolutePage }),
}));

export const useGetWinnerPage = () => usePaginationStore((state) => state.page);
export const useTurnWinnerPage = () => usePaginationStore((state) => state.turnPage);
export const useSetWinnerPage = () => usePaginationStore((state) => state.setPage);
