import { ReactNode } from "react";

export type Filters = Record<string, string | number | null | undefined>;

export interface FilterProps {
  filters: Record<string, Filters>; 
  setFilters: (key: string, f: Filters) => void;
  clearFilters: (key: string) => void;
  hasFilters: (key: string) => boolean;
}

export enum FilterGroup {
  Assets = "assets",
  Devices = "devices",
}

export interface FilterDrawerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}
