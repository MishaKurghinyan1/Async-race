import type { Car } from '@/interfaces';

export type DriveResult = {
  success: boolean;
};

export type RoadProps = Car & {
  carsRefMap: React.RefObject<Map<number, HTMLDivElement | null>>;
  setSelected: ({ id, name }: { id: number; name: string }) => void;
};
