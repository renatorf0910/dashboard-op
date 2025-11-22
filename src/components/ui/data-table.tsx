"use client"

import { useFilterDrawerStore } from "@/application/store/useFilterDrawerStore"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { DataTableProps } from "@/domain/types/table/DataTableItemsProps"
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, } from "@tanstack/react-table"
import { ListFilterPlus } from "lucide-react"
import * as React from "react"
import { Button } from "./button"
import { DataTableViewOptions } from "./data-table-view-options"
import { PaginationWithSize } from "./pagination-with-size"

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 15,
  selectedRow,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const { open } = useFilterDrawerStore();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    initialState: { pagination: { pageSize } },
    meta: { onSelectRow: selectedRow },
  })

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex justify-between mt-1 items-center">
        <input
          placeholder="Search..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="px-3 py-2 border rounded-md w-full mr-2"
        />
        <DataTableViewOptions table={table} />
        <Button
          className="cursor-pointer ml-2"
          aria-label="open-filters"
          onClick={open}
        >
          <ListFilterPlus />
        </Button>
      </div>
      <div className="flex-1 overflow-auto border rounded-md max-w-full">
        <Table className="table-premium w-full">
          <TableHeader>
            {table.getHeaderGroups().map((group) => (
              <TableRow key={group.id}>
                {group.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="table-row-divider"
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => selectedRow?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </div>

      <PaginationWithSize
        currentPage={table.getState().pagination.pageIndex}
        totalPages={table.getPageCount()}
        pageSize={table.getState().pagination.pageSize}
        onPageChange={(page) => table.setPageIndex(page)}
        onPageSizeChange={(size) => table.setPageSize(size)}
      />

    </div>
  )
}
