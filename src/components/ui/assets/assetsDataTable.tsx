"use client"

import { useAssetDrawerStore } from "@/application/store/useAssetDrawerStore";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";
import { AssetsDataTableProps, AssetsProps } from "@/domain/types/assets/AssetsProps";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import { RiskBadge } from "../badge-risk";
import { Button } from "../button";
import { DataTable } from "../data-table";
import { HeaderDataTable } from "../header-data-table";
import { LocationBadge } from "../location-badge";
import { ActionsCell } from "../actions-cell";

export const columns: ColumnDef<AssetsProps>[] = [
    {
        accessorKey: "name",
        meta: { label: "Name" },
        header: HeaderDataTable<AssetsProps>("Name"),
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "location",
        meta: { label: "Location" },
        header: HeaderDataTable<AssetsProps>("Location"),
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
        meta: { label: "Risk" },
        header: HeaderDataTable<AssetsProps>("Risk"),
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
        meta: { label: "Risk Score" },
        header: HeaderDataTable<AssetsProps>("Risk Score"),
        cell: ({ row }) => {
            const value = row.getValue("riskScore") as number
            return <div className="px-3">{value?.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "supplier",
        meta: { label: "Supplier" },
        header: HeaderDataTable<AssetsProps>("Supplier"),
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("supplier")}</div>;
        },
    },
    {
        id: "actions",
        meta: { label: "Actions" },
        header: () => (
            <Button variant="flush">
                Actions
            </Button>
        ),
        cell: ({ row }) => {
            const asset = row.original;
            return <ActionsCell asset={asset} />;
        },
    },

]


export default function AssetsDataTable({ assets, selectedRow, onClearFilters }: AssetsDataTableProps) {
    return <DataTable columns={columns} data={assets} selectedRow={selectedRow} onClearFilters={onClearFilters} />
}