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

// TODO: EU NAO ESQUECER DE TIPAR HIEIN topology
export async function getTopology(assetId: string) {
  const response = await api.get("/topology");
  const topology = response.data;

  if (!topology?.nodes || !topology?.edges) {
    throw new Error("Invalid topology data");
  }

  const { nodes, edges } = topology;

  const siteNode = nodes.find((n) => n.id === assetId && n.nodeType === "site");
  if (!siteNode) {
    throw new Error(`Site ${assetId} not found`);
  }

  const gateways = nodes.filter(
    (n) => n.nodeType === "gateway" && n.parentId === siteNode.id
  );

  const devices = nodes.filter(
    (n) =>
      n.nodeType === "device" &&
      gateways.some((g) => g.id === n.parentId)
  );

  const filteredNodes = [siteNode, ...gateways, ...devices];

  const nodeIds = filteredNodes.map((n) => n.id);
  const filteredEdges = edges.filter(
    (e) => nodeIds.includes(e.source) && nodeIds.includes(e.target)
  );

  return {
    nodes: filteredNodes,
    edges: filteredEdges,
  };
}



export default api;
