import { useMutation } from '@tanstack/react-query';
import { startRace, stopRace, switchToDrive } from '@/api/race/race.api';
import { isHttpError } from '@/utils';
import type { EngineArgs } from '@/types';

export function useStartEngine() {
  return useMutation({
    mutationFn: ({ id, signal }: EngineArgs) => startRace(id, signal),
    onError: (error) => console.error('Failed to start engine:', error),
  });
}

export function useDriveEngine() {
  return useMutation({
    mutationFn: ({ id, signal }: EngineArgs) => switchToDrive(id, signal),
    onError: (error) => {
      if (!isHttpError(error, 500)) {
        console.error('Failed to switch to drive:', error);
      }
    },
  });
}

export function useStopEngine() {
  return useMutation({
    mutationFn: ({ id, signal }: EngineArgs) => stopRace(id, signal),
    onError: (error) => console.error('Failed to stop engine:', error),
  });
}
