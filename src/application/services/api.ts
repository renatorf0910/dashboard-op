import { AssetsProps, AssetsQueryParams, PaginatedAssetsResponse } from "@/domain/types/assets/AssetsProps";
import { Device, DeviceProps } from "@/domain/types/device/DeviceProps";
import { DiagramData, DiagramEdge, DiagramNode } from "@/domain/types/diagram/DiagramProps";
import { Gateway, GatewayProps } from "@/domain/types/gateway/GatewayProps";
import { TopologyResponse } from "@/domain/types/topology/TopologyProps";
import { VulnerabilityProps } from "@/domain/types/vulnerability/VulnerabilityProps";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Error in request');
    }
    return Promise.reject(error);
  }
);

export async function getAssets(params: AssetsQueryParams): Promise<PaginatedAssetsResponse> {
  const { page, pageSize, filters } = params;
  const response = await api.get(`/assets`);

  const data: AssetsProps[] = await response.data;

  const filtered = data.filter((asset: AssetsProps) =>
    (!filters.name || asset.name.toLowerCase().includes(filters.name.toLowerCase())) &&
    (!filters.location || asset.location === filters.location) &&
    (!filters.risk || asset.risk === filters.risk) &&
    (!filters.supplier || asset.supplier.toLowerCase().includes(filters.supplier.toLowerCase()))
  );

  const start = (page - 1) * pageSize;
  const sliced = filtered.slice(start, start + pageSize);

  return {
    items: sliced,
    total: filtered.length,
  };
}

export async function getAllAssets(): Promise<AssetsProps[]> {
  const response = await api.get(`/assets`);
  return response.data;
}


export async function getVulnerabilitiesByAssetId(assetId: string): Promise<VulnerabilityProps[]> {
  const response = await api.get(`/vulnerabilities`, {
    params: { assetId },
  });
  return response.data;
}

export async function getTopology(): Promise<TopologyResponse> {
  const response = await api.get("/topology");
  const topology = response.data;

  return topology;
}

export async function getGateways(): Promise<GatewayProps[]> {
  const response = await api.get("/gateways");
  const gateways = response.data;

  return gateways;
}


export async function getDevice(): Promise<Device[]> {
  const response = await api.get("/devices");
  const devices = response.data;

  return devices;
}


export async function getDevices(filters?: Partial<DeviceProps>) {
  const response = await api.get<DeviceProps[]>("/devices");
  let data = response.data;

  if (filters) {
    const filterKeys = Object.keys(filters) as (keyof DeviceProps)[];

    data = data.filter((item) =>
      filterKeys.every((key) => {
        const filterValue = filters[key];
        if (filterValue === undefined || filterValue === null || filterValue === "") {
          return true;
        }
        const itemValue = item[key];
        if (itemValue === undefined || itemValue === null) return false;

        return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
      })
    );
  }

  return data;
}

export async function getAssetById(id: string): Promise<AssetsProps | null> {
  try {
    const response = await api.get<AssetsProps>(`/assets/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.error("Err find asset:", error);
    return null;
  }
}

export async function getDiagram(): Promise<DiagramData> {
  const [topology, gateways, devices]: [
    TopologyResponse,
    Gateway[],
    Device[]
  ] = await Promise.all([getTopology(), getGateways(), getDevice()]);

  const sites = topology.nodes ?? [];
  const topologyEdges = topology.edges ?? [];

  const nodes: DiagramNode[] = [];
  const edges: DiagramEdge[] = [];

  for (const edge of topologyEdges) {
    const site = sites.find((s) => s.id === edge.source);
    const gateway = gateways.find((g) => g.id === edge.target);

    if (!site || !gateway) continue;

    if (!nodes.find((n) => n.id === site.id)) {
      nodes.push({
        id: String(site.id),
        label: site.name ?? site.label ?? `Site ${site.id}`,
        nodeType: "site",
        position: { x: 0, y: 0 },
        entity: site
      });
    }

    if (!nodes.find((n) => n.id === gateway.id)) {
      nodes.push({
        id: String(gateway.id),
        label: gateway.name ?? gateway.label ?? `Gateway ${gateway.id}`,
        nodeType: "gateway",
        position: { x: 0, y: 0 },
        entity: gateway
      });
    }

    edges.push({
      id: `e-${site.id}-${gateway.id}`,
      source: String(site.id),
      target: String(gateway.id),
    });

    const gatewayDevices = devices.filter((d) => d.gatewayId === gateway.id);

    for (const device of gatewayDevices) {
      if (!nodes.find((n) => n.id === device.id)) {
        nodes.push({
          id: String(device.id),
          label: device.name ?? `Device ${device.id}`,
          nodeType: "device",
          position: { x: 0, y: 0 },
          entity: device

        });
      }

      edges.push({
        id: `e-${gateway.id}-${device.id}`,
        source: String(gateway.id),
        target: String(device.id),
      });
    }
  }

  return {
    nodes,
    topologyEdges: edges,
  };
}


export default api;
