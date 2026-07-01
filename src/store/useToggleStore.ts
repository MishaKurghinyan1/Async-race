import type { SetState } from '@/interfaces';
import { create } from 'zustand';

const useSetStore = create<SetState>((set) => ({
  value: true,
  setValue: (val) => set({ value: val }),
}));

export const useGetValue = () => useSetStore((state) => state.value);
export const useSetValue = () => useSetStore((state) => state.setValue);
