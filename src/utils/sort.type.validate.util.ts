import type { SortOrderType, SortType } from '@/types';

const ALLOWED_SORT: SortType[] = ['id', 'wins', 'time'];
const ALLOWED_ORDER: SortOrderType[] = ['ASC', 'DESC'];

export function isSortType(value: string | null): value is SortType {
  return ALLOWED_SORT.includes(value as SortType);
}

export function isSortOrderType(value: string | null): value is SortOrderType {
  return ALLOWED_ORDER.includes(value as SortOrderType);
}
