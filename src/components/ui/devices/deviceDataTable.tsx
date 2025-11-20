"use client";

import { DeviceProps } from "@/domain/types/device/DeviceProps";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { HeaderDataTable } from "../headerDataTable";

export const deviceColumns: ColumnDef<DeviceProps>[] = [
    {
        accessorKey: "name",
        header: HeaderDataTable<DeviceProps>("Name"),
        cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "assetId",
        header: HeaderDataTable<DeviceProps>("Asset Reference"),
        cell: ({ row }) => <div className="px-3">{row.getValue("assetId")}</div>,
    },
    {
        accessorKey: "gatewayId",
        header: HeaderDataTable<DeviceProps>("Gateway Reference"),
        cell: ({ row }) => <div className="px-3">{row.getValue("gatewayId")}</div>,
    },
    {
        accessorKey: "type",
        header: HeaderDataTable<DeviceProps>("Type"),
        cell: ({ row }) => (
            <div className="px-3 text-muted-foreground">{row.getValue("type")}</div>
        ),
    },
    {
        id: "actions",
        header: () => (
            <button className="px-3 text-sm font-medium">Details</button>
        ),
        cell: ({ row }) => {
            const device = row.original;
            const { openDrawer } = useDeviceStore();

            return (
                <Button
                    variant="flush"
                    onClick={(e) => {
                        e.stopPropagation();
                        openDrawer(device);
                    }}
                >
                    Details
                </Button>
            );
        },
    },
];

export default function DeviceDataTable({ devices, onRowClick }: {
    devices: DeviceProps[];
    onRowClick?: (device: DeviceProps) => void;
}) {
    return (
        <DataTable
            columns={deviceColumns}
            data={devices}
            selectedRow={onRowClick}
        />
    );
}
