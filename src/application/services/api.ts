import { AssetsProps, AssetsQueryParams, PaginatedAssetsResponse } from "@/domain/types/assets/AssetsProps";
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
            console.log('Bagaço');
        }
        return Promise.reject(error);
    }
);

export async function getAssets(params: AssetsQueryParams): Promise<PaginatedAssetsResponse> {
  const { page, pageSize, filters } = params;
  const response = await api.get(`/assets`);
  console.log('response: ', response.data)
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

export async function getVulnerabilitiesByAssetId(assetId: string): Promise<VulnerabilityProps[]> {
    const response = await api.get(`/vulnerabilities`, {
        params: { assetId },
    });
    return response.data;
}

export async function getTopology() {
  const response = await api.get("/topology");
  const topology = response.data;

  return topology;
}

export async function getGateways() {
  const response = await api.get("/gateways");
  const gateways = response.data;

  return gateways;
}


export async function getDevices() {
  const  response = await api.get("/devices");
  const devices = response.data;

  return devices;
}


export default api;
