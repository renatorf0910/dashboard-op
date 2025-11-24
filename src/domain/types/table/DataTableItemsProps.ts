import { ColumnDef } from "@tanstack/react-table"

export interface Column<T> {
  key: keyof T;
  label: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  selectedRow?: (rowData: TData) => void;
  onClearFilters?: () => void
}