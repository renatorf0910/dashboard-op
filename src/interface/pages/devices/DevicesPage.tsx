"use client";

import { useDevices } from "@/application/hooks/useDevices";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useState } from "react";

import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import DeviceDataTable from "@/components/ui/devices/deviceDataTable";
import { TableSkeleton } from "@/components/ui/tableSkeleton";

import { ErrorBoundary } from "@/components/error/errorBoundary";
import { Button } from "@/components/ui/button";
import { DeviceDetailsDialog } from "@/components/ui/devices/DeviceDetailsDialog";
import { DeviceProps } from "@/domain/types/device/DeviceProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";
import { ListFilterPlus } from "lucide-react";

export default function DevicesPage() {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { filters, setFilters, clearFilters } = useFilterStore();
  const deviceFilters = filters["devices"] ?? {};

  const deviceFields: SearchFormFields<DeviceProps>[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "assetId", label: "Asset ID", type: "text" },
    { name: "gatewayId", label: "Gateway ID", type: "text" },
    {
      name: "type", label: "Type", type: "select",
      options: [
        { label: "PLC", value: "plc" },
        { label: "Sensor", value: "sensor" },
        { label: "HMI", value: "hmi" },

      ],
    },

  ];

  const { data, isLoading } = useDevices({ filters: deviceFilters });

  const { openDrawer: openDeviceDrawerFilter } = useDeviceStore();

  const devices = data ?? [];

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col p-4 gap-4">

      <Button className="ml-auto cursor-pointer" onClick={() => setOpenDrawer(true)}>
        <ListFilterPlus />
      </Button>

      <SearchFormDrawer
        title="Filter Devices"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        fields={deviceFields}
        initialValues={deviceFilters}
        onSubmit={(values) => {
          setFilters("devices", values);
          setOpenDrawer(false);
        }}
        onClear={() => clearFilters("devices")}
      />
      <ErrorBoundary fallback="Error loading Table Devices">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto">
            <DeviceDataTable
              devices={devices}
              onRowClick={(device) => openDeviceDrawerFilter(device)}
            />
          </div>
        </div>
      </ErrorBoundary >

      <DeviceDetailsDialog />
    </div >
  );
}
