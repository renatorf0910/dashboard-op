"use client";

import { useDevices } from "@/application/hooks/useDevices";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { ErrorBoundary } from "@/components/error/errorBoundary";
import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import DeviceDataTable from "@/components/ui/devices/deviceDataTable";
import { SkeletonTable } from "@/components/ui/table-skeleton";

import { DeviceAllInfosProps, DeviceFilterForm } from "@/domain/types/device/DeviceProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";

import { useAllAssets } from "@/application/hooks/useAllAssets";
import { useGatewaysStore } from "@/application/store/useGatewayStore";
import { FilterGroup } from "@/domain/types/filters/FIlterProps";
import * as Yup from "yup";

export default function DevicesPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openDrawer, setOpenDrawer] = useState(false);

  const filters = useFilterStore(s => s.filters);
  const setFilters = useFilterStore(s => s.setFilters);
  const clearFilters = useFilterStore(s => s.clearFilters);
  const filtersApplied = useFilterStore(s => s.hasFilters(FilterGroup.Devices));

  useEffect(() => {
    const obj = Object.fromEntries(searchParams.entries());

    if (Object.keys(obj).length > 0) {
      setFilters(FilterGroup.Devices, obj);
    }
  }, []);

  const deviceFilters = (filters[FilterGroup.Devices] ?? {}) as DeviceFilterForm;

  const { devices, isLoadingVulnerabilities: isLoading } = useDevices({
    filters: deviceFilters,
  });

  const { assets } = useAllAssets();
  const { gateways } = useGatewaysStore();

  const { setDevice } = useDeviceStore();

  const normalizedInitialValues = useMemo(() => {
    return {
      name: deviceFilters.name ?? "",
      type: deviceFilters.type ?? "",
    };
  }, [deviceFilters]);

  const deviceFields: SearchFormFields<DeviceFilterForm>[] = [
    { name: "name", label: "Name", type: "text" },
    {
      name: "type", label: "Type", type: "select",
      options: [
        { label: "PLC", value: "plc" },
        { label: "Sensor", value: "sensor" },
        { label: "HMI", value: "hmi" },
      ],
    },
  ];

  const deviceFilterSchema = Yup.object({
    name: Yup.string().optional(),
    type: Yup.string().optional(),
  });

  const handleRowClick = (device: DeviceAllInfosProps) => {
    setDevice(device);
    router.push(`/devices/${device.id}?${searchParams.toString()}`);
  };

  const resetFilters = () => {
    clearFilters(FilterGroup.Devices);
    router.replace(`/devices`);
  };

  if (isLoading || !assets || !gateways) return <SkeletonTable />;

  return (
    <div className="h-[calc(100svh-var(--header-height))] md:h-[calc(100vh-var(--header-height))] flex flex-col">
      <div className="px-6 py-6 ">
        <h1 className="text-3xl font-bold tracking-tight">Devices Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View available devices, click for more information about each device.
        </p>
      </div>
      <SearchFormDrawer<DeviceFilterForm>
        title="Filter Devices"
        open={openDrawer}
        onOpenChange={setOpenDrawer}
        fields={deviceFields}
        initialValues={normalizedInitialValues}
        validation={deviceFilterSchema}
        filtersApplied={filtersApplied}
        onSubmit={(values) => {
          setFilters(FilterGroup.Devices, values);
          const params = new URLSearchParams();
          Object.entries(values).forEach(([k, v]) => {
            if (v) params.set(k, String(v));
          });
          router.replace(`/devices?${params.toString()}`);
          setOpenDrawer(false);
        }}
        onClear={() => {
          resetFilters();
          setOpenDrawer(false);
        }}
      />
      <ErrorBoundary fallback="Error loading Table Devices">
        <DeviceDataTable
          devices={devices ?? []}
          assets={assets}
          gateways={gateways}
          onRowClick={handleRowClick}
          onClearFilters={resetFilters}
        />
      </ErrorBoundary>
    </div>
  );
}
