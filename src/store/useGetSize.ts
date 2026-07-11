import type { SizeStore } from '@/interfaces/size.store.interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePaginationStore = create<SizeStore>()(
  persist(
    (set) => ({
      size: 500,
      setSize: (newSize) => set({ size: newSize }),
    }),
    {
      name: 'garage-page-storage',
    },
  ),
);

export const useGetSize = () => usePaginationStore((state) => state.size);
export const useSetSize = () => usePaginationStore((state) => state.setSize);
