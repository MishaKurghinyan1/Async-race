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

export const useGetGaragePage = () => usePaginationStore((state) => state.page);
export const useTurnGaragePage = () => usePaginationStore((state) => state.turnPage);
export const useSetGaragePage = () => usePaginationStore((state) => state.setPage);
