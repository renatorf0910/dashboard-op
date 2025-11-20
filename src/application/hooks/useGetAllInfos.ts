import { useMemo } from "react";
import { useAllAssets } from "@/application/hooks/useAllAssets";
import { DeviceAllInfosProps, DeviceProps } from "@/domain/types/device/DeviceProps";
import { useGatewaysStore } from "../store/useGatewayStore";

export function useGetAllInfos(devices: DeviceProps[]) {
  const { assets } = useAllAssets();
  const { gateways } = useGatewaysStore();

  const allInformaction = useMemo<DeviceAllInfosProps[]>(() => {
    if (!devices || !assets || !gateways) return [];

    return devices.map((device) => ({
      ...device,
      asset: assets.find((a) => a.id === device.assetId) || null,
      gateway: gateways.find((g) => g.id === device.gatewayId) || null,
    }));
  }, [devices, assets, gateways]);

  return allInformaction;
}
