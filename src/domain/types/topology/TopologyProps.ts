export interface TopologyNode {
  id: string;
  nodeType: "site" | "gateway" | "device";
  name: string;
  assetId?: string;
  gatewayId?: string;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
}


export interface DiagramProps {
  assetId: string;
}

