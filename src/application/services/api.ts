import { AssetsProps } from "@/domain/types/assets/AssetsProps";
import { VulnerabilityProps } from "@/domain/types/vulnerability/VulnerabilityProps";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

export async function getAssets(): Promise<AssetsProps[]> {
    const response = await api.get("/assets")
    return response.data;
}

export async function getVulnerabilitiesByAssetId(assetId: string): Promise<VulnerabilityProps[]> {
    const response = await api.get(`/vulnerabilities`, {
        params: { assetId },
    });
    return response.data;
}


// TODO: TIPAR getTopology getGateways getDevices AND FIXED ON DIAGRAM, DON'T FORGET
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
  const gateways = response.data;

  return gateways;
}


export default api;
