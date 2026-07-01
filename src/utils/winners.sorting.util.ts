import type { CarForSorting, SortConfiguration } from '@/interfaces';
import type { SortField, SortOrder } from '@/types';

export function sortCars(cars: CarForSorting[], config: SortConfiguration): CarForSorting[] {
  const { primaryField, primaryOrder, secondaryField, secondaryOrder } = config;

  // Use ES2023 .toSorted() to return a new array safely without mutating the original source
  return cars.toSorted((a, b) => {
    // Helper closure to dynamically evaluate a single field's direction
    const compareField = (field: SortField, order: SortOrder): number => {
      let valA = a[field] ?? 0; // Fallback for undefined/null metrics
      let valB = b[field] ?? 0;

      // STRESS-TEST FIX: If time is 0, it means the car hasn't raced.
      // A time of 0 shouldn't win an ascending sort. Push unraced cars to the bottom.
      if (field === 'time') {
        if (valA === 0) return 1; // Send a to the back
        if (valB === 0) return -1; // Send b to the back
      }

      if (valA < valB) return order === 'asc' ? -1 : 1;
      if (valA > valB) return order === 'asc' ? 1 : -1;
      return 0;
    };

    // Execute primary comparison
    const primaryResult = compareField(primaryField, primaryOrder);

    // If primaryResult !== 0, return it immediately. Otherwise, evaluate secondary field.
    return primaryResult || compareField(secondaryField, secondaryOrder);
  });
}
