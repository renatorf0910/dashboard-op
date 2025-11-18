"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../data-table";
import { AssetsProps } from "@/domain/types/assets/AssetsProps";
import { Button } from "../button";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<AssetsProps>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue("location")}</div>;
        },
    },
    {
        accessorKey: "risk",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Risk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue("risk")}</div>;
        },
    },
    {
        accessorKey: "riskScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Risk Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("riskScore") as number
            return <div>{value?.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "supplier",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Supplier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div>{row.getValue("supplier")}</div>;
        },
    },
]

interface AssetsDataTableProps {
  assets: AssetsProps[];
  total: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  selectedRow: (asset: AssetsProps) => void;
}


export default function AssetsDataTable({ assets, selectedRow }: AssetsDataTableProps) {
    return <DataTable columns={columns} data={assets} selectedRow={selectedRow} />
}