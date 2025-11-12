import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getDevices, getGateways, getTopology } from "../services/api";
// TODO: TESTING WITH THIS TYPES, FIXED AND MOUNT THE RIGHT TYPE, DON'T FOTGOT
export type NodeType = "site" | "gateway" | "device";

export interface BaseEntity {
  id: string;
  name?: string;
  label?: string;
}

export interface TopologyResponse {
  nodes: BaseEntity[];
  edges: { id: string; source: string; target: string }[];
}

export interface Gateway extends BaseEntity {
  siteId?: string;
}

export interface Device extends BaseEntity {
  gatewayId: string;
}

export interface DiagramNode {
  id: string;
  label: string;
  nodeType: NodeType;
  position: { x: number; y: number };
}

export interface DiagramEdge {
  id: string;
  source: string;
  target: string;
}

export interface DiagramData {
  nodes: DiagramNode[];
  topologyEdges: DiagramEdge[];
}

// TODO: TESTING PROMISE ---- MOVE THIS PROMISE TO THR RIGHYT PLACE
export async function getDiagram(): Promise<DiagramData> {
  const [topology, gateways, devices]: [
    TopologyResponse,
    Gateway[],
    Device[]
  ] = await Promise.all([
    getTopology(),
    getGateways(),
    getDevices(),
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
