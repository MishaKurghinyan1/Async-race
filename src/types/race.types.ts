export type Race = {
  id: number;
  status: 'started' | 'stopped | drivesType';
};

export type EngineArgs = { id: number; signal?: AbortSignal };

export type StartResponse = {
  velocity: number;
  distance: number;
};
