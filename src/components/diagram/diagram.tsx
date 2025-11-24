"use client";

import { useTopology } from "@/application/hooks/useTopology";
import { useSelectedAssetStore } from "@/application/store/useSelectedAssetStore";
import { DiagramNodeData, NodeType } from "@/domain/types/topology/TopologyProps";
import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "dagre";
import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";

export function Diagram({ selectedNodeId }: { selectedNodeId?: string }) {
  const { data, isLoading, isError, refetch } = useTopology();
  const { setCenter } = useReactFlow();

  const [nodes, setNodes] = useState<Node<DiagramNodeData>[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<DiagramNodeData> | null>(null);

  const [edges, setEdges] = useState<Edge[]>([]);
  const { selectedId, setSelectedId } = useSelectedAssetStore();


  const nodeWidth = 180;
  const nodeHeight = 60;

  const getLayoutedElements = (
    nodes: Node<{ label: string; nodeType: NodeType }>[],
    edges: Edge[],
    direction = "TB"
  ) => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((n) => dagreGraph.setNode(String(n.id), { width: nodeWidth, height: nodeHeight }));
    edges.forEach((e) => dagreGraph.setEdge(String(e.source), String(e.target)));

    dagre.layout(dagreGraph);

    return {
      nodes: nodes.map((node) => {
        const pos = dagreGraph.node(String(node.id));
        return { ...node, position: { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 } };
      }),
      edges,
    };
  };

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<{ label: string; nodeType: NodeType }>>[]) =>
      setNodes((current) => applyNodeChanges(changes, current)),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((current) => applyEdgeChanges(changes, current)),
    []
  );

  useEffect(() => {
    if (!data?.nodes?.length) return;

    const rawNodes: Node<{ label: string; nodeType: NodeType }>[] = data.nodes.map((n) => ({
      id: String(n.id),
      type: "default",
      position: { x: 0, y: 0 },
      data: { label: n.label, nodeType: n.nodeType, entity: n.entity },
      style: {
        border: "2px solid #002177",
        background: n.nodeType === "gateway" ? "#3CF0FF" : "#002177",
        color: n.nodeType === "gateway" ? "#002177" : "#FFFFFF",
        borderRadius: 8,
        padding: 8,
        textAlign: "center",
      },
    }));

    const rawEdges: Edge[] = data.topologyEdges.map((e) => ({
      id: String(e.id),
      source: String(e.source),
      target: String(e.target),
      animated: true,
      style: { stroke: "#94a3b8" },
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(rawNodes, rawEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [data]);

  useEffect(() => {
    if (!selectedNodeId || nodes.length === 0) return;
    const node = nodes.find((n) => n.id === selectedNodeId);
    if (node) {
      setCenter(node.position.x + nodeWidth / 2, node.position.y + nodeHeight / 2 + 80, {
        zoom: 1.7,
        duration: 1000,
      });
    }
  }, [selectedNodeId, nodes, setCenter]);

  const handleNodeClick = (
    _evt: unknown,
    node: Node<DiagramNodeData>
  ) => {
    if (node.data.nodeType === "device" && node.data.entity) {
      setSelectedId(node.data.entity.assetId);
    }

    setSelectedNode(node);
  };


  if (isLoading) return <div className="flex items-center justify-center h-full text-gray-500">Loading topology...</div>;

  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-red-500">
        <span>Failed to load topology</span>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
        >
          Retry
        </button>
      </div>
    );

  if (!data?.nodes?.length)
    return <div className="flex items-center justify-center h-full text-gray-400">No topology available</div>;

  return (
    <div className="w-full h-full flex relative">
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          fitView
          nodesDraggable={false}
          nodesConnectable={false}
        >
          <Controls />
          <Background />

          <MiniMap
            className="!absolute !bottom-6 !right-6 bg-white/30 backdrop-blur-sm border rounded-md shadow-md"
            style={{ width: 150, height: 120, zIndex: 999 }}
            nodeColor={(n) => (n.data.nodeType === "gateway" ? "#3CF0FF" : "#002177")}
            nodeStrokeWidth={2}
          />

        </ReactFlow>
      </div>

      {selectedNode && (
        <div className=" absolute right-6 top-6 w-72 bg-white rounded-xl shadow-2xl border z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="px-4 py-3 border-b flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm font-semibold leading-none mb-1">
                {selectedNode.data.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {selectedNode.data.nodeType}
              </span>
            </div>
            <Button
              style={{ width: "3vh", height: "3vh" }}
              variant="default"
              size="icon"
              className="rounded-full mb-4 cursor-pointer"
              onClick={() => setSelectedNode(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="px-4 py-4 flex flex-col gap-4">
            {selectedNode.data.nodeType === "device" && (
              <Link href={`/assets/${selectedId}`}>
                <Button className="w-full h-9 text-sm cursor-pointer">
                  Open asset details
                </Button>
              </Link>
            )}

            <div className="text-[10px] text-muted-foreground border-t pt-3 flex justify-between">
              <span>Node ID</span>
              <span className="font-mono">{selectedNode.id}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
