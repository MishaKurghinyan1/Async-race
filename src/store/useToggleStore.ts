import type { SetState } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSetStore = create<SetState>()(
  persist(
    (set) => ({
      value: true,
      setValue: (val) => set({ value: val }),
    }),
    {
      name: 'set-store-storage',
    },
  ),
);

export const useGetValue = () => useSetStore((state) => state.value);
export const useSetValue = () => useSetStore((state) => state.setValue);
