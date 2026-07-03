import type { PaginationState } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaginationStore = create<PaginationState>()(
  persist(
    (set) => ({
      page: 1,

      turnPage: (offset) =>
        set((state) => ({
          page: Math.max(1, state.page + offset),
        })),

      setPage: (absolutePage) => set({ page: absolutePage }),
    }),
    {
      name: 'garage-page-storage',
    },
  ),
);

export const useGetGaragePage = () => usePaginationStore((state) => state.page);
export const useTurnGaragePage = () => usePaginationStore((state) => state.turnPage);
