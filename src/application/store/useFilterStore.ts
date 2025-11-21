import { create } from "zustand";
import { Filters, FilterProps } from "@/domain/types/filters/FIlterProps";

export const useFilterStore = create<FilterProps>()((set, get) => ({
  filters: {},

  setFilters: (key, partialFilters) =>
    set((state) => {
      const currentGroup = state.filters[key] ?? {};
      const merged = { ...currentGroup, ...partialFilters };
      const isSame =
        Object.keys(merged).length === Object.keys(currentGroup).length &&
        Object.entries(merged).every(([k, v]) => currentGroup[k] === v);

      if (isSame) return state;

      return {
        filters: {
          ...state.filters,
          [key]: merged,
        },
      };
    }),

  clearFilters: (key) =>
    set((state) => {
      if (!state.filters[key] || Object.keys(state.filters[key]).length === 0) {
        return state;
      }

      return {
        filters: {
          ...state.filters,
          [key]: {},
        },
      };
    }),

  hasFilters: (key) => {
    const group = get().filters[key];
    if (!group) return false;

    return Object.values(group).some((value) => {
      return value !== "" && value !== undefined && value !== null;
    });
  },
}));
