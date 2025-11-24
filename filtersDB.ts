import { SavedFilter } from "@/domain/types/filters/FIlterProps";
import Dexie, { Table } from "dexie";

export class FiltersDB extends Dexie {
  filters!: Table<SavedFilter>;

  constructor() {
    super("filters_db");

    this.version(1).stores({
      filters: "++id, name",
    });
  }
}

export const filtersDB = new FiltersDB();
