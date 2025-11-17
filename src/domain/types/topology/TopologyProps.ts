export type NodeType = "site" | "gateway" | "device";

export interface TopologyNode {
  id: string;
  label: string;
  nodeType: NodeType;
}

export interface TopologyEdge {
  id: string;
  source: string;
  target: string;
}

export interface TopologyData {
  nodes: TopologyNode[];
  topologyEdges: TopologyEdge[];
}

export interface UseTopologyResult {
  data: TopologyData | null;
  isLoading: boolean;
  isError: boolean;
}

export interface BaseEntity {
  id: string;
  name?: string;
  label?: string;
}

export interface TopologyResponse {
  nodes: BaseEntity[];
  edges: { id: string; source: string; target: string }[];
}


