import type { RaceResult } from '@/interfaces';
import type { StartResponse } from '@/types';
import { startUiCarAnimation } from './start.ui.car.animation.util';

export const driveSingleCar = async (
  carId: number,
  startEngineFn: (args: { id: number; signal?: AbortSignal }) => Promise<StartResponse>,
  driveEngineFn: (args: { id: number; signal?: AbortSignal }) => Promise<unknown>,
  controller: AbortController,
  onAnimationStart: (id: number, anim: Animation) => void,
): Promise<RaceResult> => {
  const carElement = document.getElementById(carId.toString());
  if (!carElement) return { carId, time: Infinity, success: false };

  try {
    const { velocity, distance } = await startEngineFn({ id: carId, signal: controller.signal });
    const theoreticalDurationMs = distance / velocity;

    const startTime = performance.now();
    const animationInstance = startUiCarAnimation(carElement, theoreticalDurationMs);
    onAnimationStart(carId, animationInstance);

    try {
      await driveEngineFn({ id: carId, signal: controller.signal });
      const realDurationSeconds = (performance.now() - startTime) / 1000;
      return { carId, time: realDurationSeconds, success: true };
    } catch (error) {
      animationInstance?.pause();
      return { carId, time: Infinity, success: false };
    }
  } catch {
    return { carId, time: Infinity, success: false };
  }
};
