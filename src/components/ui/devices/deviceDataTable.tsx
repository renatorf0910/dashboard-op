"use client";

import { DeviceAllInfosProps, DeviceProps } from "@/domain/types/device/DeviceProps";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { HeaderDataTable } from "../headerDataTable";
import { useGetAllInfos } from "@/application/hooks/useGetAllInfos";

export const deviceColumns: ColumnDef<DeviceAllInfosProps>[] = [
    {
        accessorKey: "name",
        header: HeaderDataTable<DeviceAllInfosProps>("Name"),
        cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "assetId",
        header: HeaderDataTable<DeviceAllInfosProps>("Asset Reference"),
        cell: ({ row }) => <div className="px-3">{`${row.original.asset?.name}`}</div>,
    },
    {
        accessorKey: "gatewayId",
        header: HeaderDataTable<DeviceAllInfosProps>("Gateway Reference"),
        cell: ({ row }) => <div className="px-3">{`${row.original.gateway?.name}`}</div>,
    },
    {
        accessorKey: "type",
        header: HeaderDataTable<DeviceAllInfosProps>("Type"),
        cell: ({ row }) => (
            <div className="px-3 text-muted-foreground">{row.getValue("type")}</div>
        ),
    },
    {
        id: "actions",
        header: () => {
            return (
                <Button
                    variant="flush"
                >
                    Details
                </Button>
            )
        },
        cell: ({ row }) => {
            const device = row.original;
            const { openDrawer } = useDeviceStore();

            return (
                <Button
                    style={{ color: "#002177" }}
                    size="default"
                    variant="outline"
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
    const allInfosDevices = useGetAllInfos(devices);

    return (
        <DataTable
            columns={deviceColumns}
            data={allInfosDevices}
            selectedRow={onRowClick}
        />
    );
}
