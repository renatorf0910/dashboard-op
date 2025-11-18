import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDevice, getGateways, getTopology } from "../services/api";
import { TopologyResponse } from "@/domain/types/topology/TopologyProps";
import { Gateway } from "@/domain/types/gateway/GatewayProps";
import { Device } from "@/domain/types/device/DeviceProps";
import { DiagramData, DiagramEdge, DiagramNode } from "@/domain/types/diagram/DiagramProps";


export async function getDiagram(): Promise<DiagramData> {
  const [topology, gateways, devices]: [ TopologyResponse, Gateway[], Device[]] = await Promise.all([
    getTopology(),
    getGateways(),
    getDevice(),
  ]);

  const sites = topology.nodes ?? [];
  const topologyEdges = topology.edges ?? [];

  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];

  const sitePositions: Record<string, { x: number; y: number }> = {};
  const gatewayPositions: Record<string, { x: number; y: number }> = {};
  const devicePositions: Record<string, { x: number; y: number }> = {};

  let siteX = 0;
  let gatewayX = 0;
  let deviceX = 0;

  for (const edge of topologyEdges) {
    const site = sites.find((s) => s.id === edge.source);
    const gateway = gateways.find((g) => g.id === edge.target);

    if (!site || !gateway) continue;

    if (!nodes.some((n) => n.id === site.id)) {
      const pos = { x: siteX, y: 0 };
      sitePositions[site.id] = pos;
      siteX += 300;

      nodes.push({
        id: site.id,
        label: site.label ?? site.name ?? `Site ${site.id}`,
        nodeType: "site",
        position: pos,
      });
    }

    if (!nodes.some((n) => n.id === gateway.id)) {
      const pos = { x: gatewayX, y: 200 };
      gatewayPositions[gateway.id] = pos;
      gatewayX += 300;

      nodes.push({
        id: gateway.id,
        label: gateway.name ?? gateway.label ?? `Gateway ${gateway.id}`,
        nodeType: "gateway",
        position: pos,
      });
    }

    edges.push({
      id: `e-${site.id}-${gateway.id}`,
      source: site.id,
      target: gateway.id,
    });

    const gatewayDevices = devices.filter(
      (d) => d.gatewayId === gateway.id
    );

    for (const device of gatewayDevices) {
      if (!nodes.some((n) => n.id === device.id)) {
        const pos = { x: deviceX, y: 400 };
        devicePositions[device.id] = pos;
        deviceX += 300;

        nodes.push({
          id: device.id,
          label: device.name ?? `Device ${device.id}`,
          nodeType: "device",
          position: pos,
        });
      }
    }
  }

  return { nodes, topologyEdges };
}

export function useTopology(): UseQueryResult<DiagramData, Error> {
  return useQuery<DiagramData, Error>({
    queryKey: ["topology"],
    queryFn: getDiagram,
    staleTime: 1000 * 60 * 5,
  });
}
