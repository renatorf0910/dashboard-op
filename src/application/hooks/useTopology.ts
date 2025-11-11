import { useQuery } from "@tanstack/react-query";
import { AssetsProps } from "@/domain/types/assets/AssetsProps";
import { Gateway } from "@/domain/types/gateway/GatewayProps";
import { Device } from "@/domain/types/device/DeviceProps";
import { TopologyEdge, TopologyNode } from "@/domain/types/topology/TopologyProps";
import api from "../services/api";

async function fetchTopology(assetId: string) {
  const [assetRes, gatewayRes, deviceRes] = await Promise.all([
    api.get<AssetsProps>(`/assets/${assetId}`),
    api.get<Gateway[]>(`/gateways`, { params: { assetId } }),
    api.get<Device[]>(`/devices`, { params: { assetId } }),
  ]);

  const asset = assetRes.data;
  const gateways = gatewayRes.data;
  const devices = deviceRes.data;

  const nodes: TopologyNode[] = [
    {
      id: asset.id,
      nodeType: "site",
      name: asset.name,
    },
    ...gateways.map((g) => ({
      id: g.id,
      nodeType: "gateway" as const,
      name: g.name,
      assetId: g.assetId,
    })),
    ...devices.map((d) => ({
      id: d.id,
      nodeType: "device" as const,
      name: d.name,
      assetId: d.assetId,
      gatewayId: d.gatewayId,
    })),
  ];

  const edges: TopologyEdge[] = [
    ...gateways.map((g) => ({
      id: `edge-${asset.id}-${g.id}`,
      source: asset.id,
      target: g.id,
    })),
    ...devices.map((d) => ({
      id: `edge-${d.gatewayId}-${d.id}`,
      source: d.gatewayId,
      target: d.id,
    })),
  ];

  return { nodes, edges };
}

export function useTopology(assetId?: string) {
  return useQuery({
    queryKey: ["topology", assetId],
    queryFn: () => fetchTopology(assetId!),
    enabled: !!assetId,
    staleTime: 1000 * 60 * 5,
  });
}
