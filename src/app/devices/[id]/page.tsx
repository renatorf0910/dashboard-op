"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { getAllInfos } from "@/application/hooks/useGetAllInfos";
import { useDevices } from "@/application/hooks/useDevices";
import { useAllAssets } from "@/application/hooks/useAllAssets";
import { useGatewaysStore } from "@/application/store/useGatewayStore";
import DeviceDetailsPage from "@/components/ui/devices/DeviceDetailsPage";
import { ErrorBoundary } from "@/components/error/errorBoundary";

export default function DevicePageWrapper() {
  const { id } = useParams();
  const { setDevice } = useDeviceStore();

  const { devices } = useDevices();
  const { assets } = useAllAssets();
  const { gateways } = useGatewaysStore();

  useEffect(() => {
    if (!devices || !assets || !gateways) return;

    const all = getAllInfos(devices, assets, gateways);
    const selected = all.find((d) => d.id === id);

    setDevice(selected || null);
  }, [devices, assets, gateways, id]);

  return (
    <>
      <ErrorBoundary>
        <DeviceDetailsPage />
      </ErrorBoundary>
    </>
  )
}
