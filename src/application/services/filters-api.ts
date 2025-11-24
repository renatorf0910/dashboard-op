import { SavedFilter } from "@/domain/types/filters/FIlterProps";
import { filtersDB } from "../../../filtersDB";

export async function addFilter<T>(filter: SavedFilter<Partial<T>>) {
  return filtersDB.filters.add(filter);
}

export async function getFilters<T>() {
  return filtersDB.filters.toArray() as Promise<SavedFilter<Partial<T>>[]>;
}

export async function deleteFilter(id: number) {
  return filtersDB.filters.delete(id);
}

