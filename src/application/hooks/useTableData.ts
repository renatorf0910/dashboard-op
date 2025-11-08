"use client";

import { Column } from "@/domain/types/table/DataTableItemsProps";
import React, { useCallback, useMemo } from "react";

export function useTableData<T extends object>(
    data: T[],
    columns: Column<T>[]
) {
    const [filters, setFilters] = React.useState<Partial<Record<keyof T, string>>>({})

    const handleFilterChange = useCallback(
        (key: keyof T, value: string) => {
            setFilters((prev) => ({ ...prev, [key]: value }))
        },
        []
    )

    const filteredData = useMemo(() => {
        return data.filter((row) =>
            columns.every((col) => {
                const filterValue = filters[col.key]?.toLowerCase() ?? ""
                const cellValue = String(row[col.key] ?? "").toLowerCase()
                return cellValue.includes(filterValue)
            })
        )
    }, [data, filters, columns])

    return { filteredData, filters, handleFilterChange }

}

