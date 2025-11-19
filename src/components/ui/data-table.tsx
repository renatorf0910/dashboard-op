"use client"
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table"
import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DataTableProps } from "@/domain/types/table/DataTableItemsProps"
import { PaginationWithSize } from "./pagination-with-size"

export function DataTable<TData, TValue>({ columns, data, pageSize = 15, selectedRow, }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    initialState: { pagination: { pageSize } },
    meta: { onSelectRow: selectedRow },
  })

  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex-1 overflow-auto border rounded-md">
        <Table className="table-premium min-w-full">

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
