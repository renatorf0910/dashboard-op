"use client"

import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { AssetsDataTableProps, AssetsProps } from "@/domain/types/assets/AssetsProps";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { RiskBadge } from "../badge-risk";
import { Button } from "../button";
import { DataTable } from "../data-table";
import { LocationBadge } from "../location-badge";

export const columns: ColumnDef<AssetsProps>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "location",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const code = row.getValue("location") as string;
            return (
                <div className="px-3">
                    <LocationBadge code={code} />
                </div>
            );
        },

    },
    {
        accessorKey: "risk",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Risk
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const risk = row.getValue("risk") as string;
            return (
                <div className="px-3">
                    <RiskBadge risk={risk} />
                </div>
            );
        },

    },
    {
        accessorKey: "riskScore",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Risk Score
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const value = row.getValue("riskScore") as number
            return <div className="px-3">{value?.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "supplier",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                    size="none"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Supplier
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("supplier")}</div>;
        },
    },
    {
        id: "actions",
        header: ({ column }) => {
            return (
                <Button
                    variant="flush"
                >
                    Details
                </Button>
            )
        },
        cell: ({ row }) => {
            const asset = row.original;
            const { openDrawer } = useAssetDrawerStore();
            return (
                <Button
                    size="default"
                    variant="flush"
                    onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(asset);
                    }}
                >
                    Details
                </Button>
            );
        },
    },

]


export default function AssetsDataTable({ assets, selectedRow }: AssetsDataTableProps) {
    return <DataTable columns={columns} data={assets} selectedRow={selectedRow} />
}