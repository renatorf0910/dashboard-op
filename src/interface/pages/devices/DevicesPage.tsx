"use client";

import { useDevices } from "@/application/hooks/useDevices";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import DeviceDataTable from "@/components/ui/devices/deviceDataTable";
import { DeviceDetailsDrawer } from "@/components/ui/devices/deviceDetailsDrawer";
import { TableSkeleton } from "@/components/ui/tableSkeleton";

export default function DevicesPage() {
  const { data, isLoading } = useDevices();
  const { openDrawer } = useDeviceStore();

  const devices = data ?? [];

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col p-4 gap-4">
      <DeviceDataTable
        devices={devices}
        onRowClick={(device) => openDrawer(device)}
      />

      <DeviceDetailsDrawer />
    </div>
  );
}
