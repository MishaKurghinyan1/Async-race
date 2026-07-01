export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface FetchCarsResponse {
  cars: Car[];
  totalCount: number;
}

export interface CarForSorting extends Car {
  wins: number;
  time: number;
}
