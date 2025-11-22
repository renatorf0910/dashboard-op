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

export const columns: ColumnDef<AssetsProps>[] = [
    {
        accessorKey: "name",
        header: HeaderDataTable<AssetsProps>("Name"),
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "location",
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
        header: HeaderDataTable<AssetsProps>("Risk Score"),
        cell: ({ row }) => {
            const value = row.getValue("riskScore") as number
            return <div className="px-3">{value?.toFixed(2)}</div>;
        },
    },
    {
        accessorKey: "supplier",
        header: HeaderDataTable<AssetsProps>("Supplier"),
        cell: ({ row }) => {
            return <div className="px-3">{row.getValue("supplier")}</div>;
        },
    },
    {
        id: "actions",
        header: () => {
            return (
                <Button
                    variant="flush"
                >
                    Actions
                </Button>
            )
        },
        cell: ({ row }) => {
            const asset = row.original;
            const { openDrawer } = useAssetDrawerStore();
            const { setSelectedAsset } = useSelectedAssetStore();
            return (
                <Button
                    className="ml-4"
                    style={{ color: "#002177" }}
                    size="default"
                    variant="outline"
                    onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(asset);
                        setSelectedAsset(asset);
                    }}
                >
                    <Info />
                </Button>
            );
        },
    },

]


export default function AssetsDataTable({ assets, selectedRow }: AssetsDataTableProps) {
    return <DataTable columns={columns} data={assets} selectedRow={selectedRow} />
}