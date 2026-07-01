import type { SortField, SortOrder } from '@/types';

export interface SortConfiguration {
  primaryField: SortField;
  primaryOrder: SortOrder;
  secondaryField: SortField;
  secondaryOrder: SortOrder;
}
