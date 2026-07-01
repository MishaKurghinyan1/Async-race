export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCarDetails extends Winner {
  carName: string;
  carColor: string;
}

export interface FetchWinnersResponse {
  winners: WinnerWithCarDetails[];
  totalCount: number;
}
