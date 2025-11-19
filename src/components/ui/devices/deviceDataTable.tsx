"use client";

import { DeviceProps } from "@/domain/types/device/DeviceProps";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { useDeviceStore } from "@/application/store/useDeviceStore";

export const deviceColumns: ColumnDef<DeviceProps>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="flush"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Name <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "assetId",
        header: ({ column }) => (
            <Button
                variant="flush"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Asset Reference <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="px-3">{row.getValue("assetId")}</div>,
    },
    {
        accessorKey: "gatewayId",
        header: ({ column }) => (
            <Button
                variant="flush"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Gateway Reference <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => <div className="px-3">{row.getValue("gatewayId")}</div>,
    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <Button
                variant="flush"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Type <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="px-3 text-muted-foreground">{row.getValue("type")}</div>
        ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <Button
                variant="flush"
            >
                Details
            </Button>
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
