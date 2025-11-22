"use client";

import { useDevices } from "@/application/hooks/useDevices";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import DeviceDataTable from "@/components/ui/devices/deviceDataTable";
import { SkeletonTable } from "@/components/ui/table-skeleton";

import { DeviceAllInfosProps, DeviceProps } from "@/domain/types/device/DeviceProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

import { useAllAssets } from "@/application/hooks/useAllAssets";
import { useGatewaysStore } from "@/application/store/useGatewayStore";
import { FilterGroup } from "@/domain/types/filters/FIlterProps";

export default function DevicesPage() {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const filters = useFilterStore(s => s.filters);
  const setFilters = useFilterStore(s => s.setFilters);
  const clearFilters = useFilterStore(s => s.clearFilters);
  const filtersApplied = useFilterStore(s => s.hasFilters(FilterGroup.Devices));

  const deviceFilters = (filters[FilterGroup.Devices] ?? {}) as Record<string, any>;

  const normalizedInitialValues = useMemo(() => {
    return Object.keys(deviceFilters).length === 0
      ? {
          name: "",
          assetId: "",
          gatewayId: "",
          type: "",
        }
      : deviceFilters;
  }, [deviceFilters]);

  const { devices, loadingVulnerabilities: isLoading } = useDevices({
    filters: deviceFilters,
  });

  const { assets } = useAllAssets();
  const { gateways } = useGatewaysStore();

  const { setDevice } = useDeviceStore();

  const deviceFields: SearchFormFields<DeviceProps>[] = [
    { name: "name", label: "Name", type: "text" },
    { name: "type", label: "Type", type: "select",
      options: [
        { label: "PLC", value: "plc" },
        { label: "Sensor", value: "sensor" },
        { label: "HMI", value: "hmi" },
      ],
    },
  ];

  const handleRowClick = (device: DeviceAllInfosProps) => {
    setDevice(device);
    router.push(`/devices/${device.id}`);
  };

  if (isLoading || !assets || !gateways) return <SkeletonTable />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col">
      <SearchFormDrawer
        title="Filter Devices"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        fields={deviceFields}
        initialValues={normalizedInitialValues}
        filtersApplied={filtersApplied}
        onSubmit={(values) => {
          setFilters(FilterGroup.Devices, values);
          setOpenDrawer(false);
        }}
        onClear={() => clearFilters(FilterGroup.Devices)}
      />
      <ErrorBoundary fallback="Error loading Table Devices">
        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 min-h-0 overflow-auto">
            <DeviceDataTable
              devices={devices ?? []}
              assets={assets}
              gateways={gateways}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  );
}
