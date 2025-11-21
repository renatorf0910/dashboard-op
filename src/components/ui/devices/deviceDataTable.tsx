"use client";

import { getAllInfos } from "@/application/hooks/useGetAllInfos";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { DeviceAllInfosProps, DeviceProps } from "@/domain/types/device/DeviceProps";
import { ColumnDef } from "@tanstack/react-table";
import { Info } from "lucide-react";
import Link from "next/link";
import { Badge } from "../badge";
import { HeaderDataTable } from "../header-data-table";

export const deviceColumns = (handleOpen: (device: DeviceAllInfosProps) => void): ColumnDef<DeviceAllInfosProps>[] => [
    {
        accessorKey: "name",
        header: HeaderDataTable<DeviceAllInfosProps>("Name"),
        cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "assetId",
        header: HeaderDataTable<DeviceAllInfosProps>("Asset Reference"),
        cell: ({ row }) => {
            const asset = row.original.asset;
            if (!asset) return <div className="px-3 text-muted-foreground">—</div>;

            return (
                <Link
                    href={`/assets/${asset.id}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <Button variant='link' style={{ color: "#002177"}}>{asset.name}</Button>
                </Link>
            );
        },
    },
    {
        accessorKey: "gatewayId",
        header: HeaderDataTable<DeviceAllInfosProps>("Gateway Reference"),
        cell: ({ row }) => <div className="px-3">{row.original.gateway?.name}</div>,
    },
    {
        accessorKey: "type",
        header: HeaderDataTable<DeviceAllInfosProps>("Type"),
        cell: ({ row }) => <Badge variant="secondary">{row.getValue("type")}</Badge>,
    },
    {
        id: "actions",
        header: () => <Button variant="flush">Actions</Button>,
        cell: ({ row }) => {
            const device = row.original;
            return (
                <Button
                    style={{ color: "#002177" }}
                    size="default"
                    variant="outline"
                    className="ml-4"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(device);
                    }}
                >
                    <Info />
                </Button>
            );
        },
    },
];

export default function DeviceDataTable({ devices, onRowClick, assets, gateways, }: {
    devices: DeviceProps[];
    onRowClick?: (device: DeviceAllInfosProps) => void;
    assets: any[];
    gateways: any[];
}) {
    const allInfosDevices = getAllInfos(devices, assets, gateways);
    const { openDrawer } = useDeviceStore();
    const handleOpen = (device: DeviceAllInfosProps) => { openDrawer(device); onRowClick?.(device); };

    return (
        <DataTable columns={deviceColumns(handleOpen)} data={allInfosDevices} selectedRow={handleOpen} />
    );
}
