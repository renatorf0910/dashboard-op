type Filters = Record<string, unknown>;

interface FilterProps {
  filters: Record<string, Filters>;
  setFilters: (key: string, f: Filters) => void;
  clearFilters: (key: string) => void;
}