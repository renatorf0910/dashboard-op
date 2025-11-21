import { AssetsProps } from "@/domain/types/assets/AssetsProps";
import { DeviceProps } from "@/domain/types/device/DeviceProps";
import { GatewayProps } from "@/domain/types/gateway/GatewayProps";

export function getAllInfos(devices: DeviceProps[], assets: AssetsProps[], gateways: GatewayProps[]) {
  if (!devices || !assets || !gateways) return [];

  return devices.map((device) => ({
    ...device,
    asset: assets.find((a) => a.id === device.assetId) || null,
    gateway: gateways.find((g) => g.id === device.gatewayId) || null,
  }));
}
