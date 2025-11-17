export type NodeType = "site" | "gateway" | "device";

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