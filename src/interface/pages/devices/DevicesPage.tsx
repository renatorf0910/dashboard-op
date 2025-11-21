"use client";

import { useDevices } from "@/application/hooks/useDevices";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { useFilterStore } from "@/application/store/useFilterStore";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

import { SearchFormDrawer } from "@/components/forms/searchFormDrawer";
import DeviceDataTable from "@/components/ui/devices/deviceDataTable";
import { TableSkeleton } from "@/components/ui/table-skeleton";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { Button } from "@/components/ui/button";
import { DeviceDetailsDialog } from "@/components/ui/devices/DeviceDetailsDialog";
import { DeviceProps, DeviceAllInfosProps } from "@/domain/types/device/DeviceProps";
import { SearchFormFields } from "@/domain/types/form/SearchFormProps";
import { ListFilterPlus } from "lucide-react";

import { useAllAssets } from "@/application/hooks/useAllAssets";
import { useGatewaysStore } from "@/application/store/useGatewayStore";
import { getAllInfos } from "@/application/hooks/useGetAllInfos";
import { TypographyTitle } from "@/components/ui/typograph-title";

export default function DevicesPage() {
  const router = useRouter();
  const params = useParams();

  const [openDrawer, setOpenDrawer] = useState(false);

  const { filters, setFilters, clearFilters } = useFilterStore();
  const deviceFilters = filters["devices"] ?? {};

  const { data, isLoading } = useDevices({ filters: deviceFilters });
  const { device, openDrawer: openDeviceDrawer, closeDrawer } = useDeviceStore();

  const { assets } = useAllAssets();
  const { gateways } = useGatewaysStore();

  const devices = data ?? [];

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

  useEffect(() => {
    if (params?.id && devices.length > 0 && assets && gateways) {
      const allInfosDevices = getAllInfos(devices, assets, gateways);
      const deviceToOpen = allInfosDevices.find((d) => d.id === params.id);
      if (deviceToOpen) {
        openDeviceDrawer(deviceToOpen);
      }
    }
  }, [params?.id, devices, assets, gateways]);

  const handleRowClick = (device: DeviceAllInfosProps) => {
    openDeviceDrawer(device);
    router.push(`/devices/${device.id}`);
  };

  const handleDialogClose = () => {
    closeDrawer();
    router.push(`/devices`);
  };

  if (isLoading || !assets || !gateways) return <TableSkeleton />;

  return (
    <div className="h-[calc(100vh-var(--header-height))] flex flex-col">
      <div className="flex mb-4 items-center justify-between">
        <TypographyTitle field="Devices" />
        <Button
          className="cursor-pointer mt-1.5"
          aria-label="open-filters"
          onClick={() => setOpenDrawer(true)}
        >
          <ListFilterPlus />
        </Button>
      </div>

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
              assets={assets}
              gateways={gateways}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </ErrorBoundary>

      <DeviceDetailsDialog onClose={handleDialogClose} />
    </div>

  );
}
