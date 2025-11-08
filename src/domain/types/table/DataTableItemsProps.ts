export interface Column<T> {
    key: keyof T,
    label: string
}

export interface TableProps<T> {
    data: T[],
    columns: Column<T>[]
}