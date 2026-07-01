export interface PaginationState {
  page: number;
  turnPage: (offset: number) => void;
  setPage: (absolutePage: number) => void;
}
