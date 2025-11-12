"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type NodeChange,
  type EdgeChange,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTopology } from "@/application/hooks/useTopology";
import {
  NodeType,
  UseTopologyResult,
} from "@/domain/types/topology/TopologyProps";
import dagre from "dagre";

export function Diagram() {
  const { data, isLoading, isError } = useTopology() as UseTopologyResult;

  const [nodes, setNodes] = useState<Node<{ label: string; nodeType: NodeType }>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node<{ label: string; nodeType: NodeType }> | null>(null);

  const nodeWidth = 180;
  const nodeHeight = 60;

  function getLayoutedElements(
    nodes: Node<{ label: string; nodeType: NodeType }>[],
    edges: Edge[],
    direction = "TB"
  ) {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction });

    nodes.forEach((node) => {
      dagreGraph.setNode(String(node.id), {
        width: nodeWidth,
        height: nodeHeight,
      });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(String(edge.source), String(edge.target));
    });

    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map((node) => {
      const n = dagreGraph.node(String(node.id));
      node.position = {
        x: n.x - nodeWidth / 2,
        y: n.y - nodeHeight / 2,
      };
      return node;
    });

    return { nodes: layoutedNodes, edges };
  }

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<{ label: string; nodeType: NodeType }>>[]) =>
      setNodes((nds) =>
        applyNodeChanges<Node<{ label: string; nodeType: NodeType }>>(changes, nds)
      ),
    []
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    if (data?.nodes?.length) {
      const rawNodes: Node<{ label: string; nodeType: NodeType }>[] = data.nodes.map(
        (n) => ({
          id: String(n.id),
          type: "default",
          position: { x: 0, y: 0 },
          data: { label: n.label, nodeType: n.nodeType },
          style: {
            border:
              n.nodeType === "site"
                ? "2px solid #2563eb"
                : n.nodeType === "gateway"
                ? "2px solid #16a34a"
                : "2px solid #9333ea",
            background:
              n.nodeType === "site"
                ? "#dbeafe"
                : n.nodeType === "gateway"
                ? "#dcfce7"
                : "#f3e8ff",
            borderRadius: 8,
            padding: 8,
          },
        })
      );

      const rawEdges: Edge[] = data.topologyEdges.map((e) => ({
        id: String(e.id),
        source: String(e.source),
        target: String(e.target),
        animated: true,
        style: { stroke: "#94a3b8" },
      }));

      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        rawNodes,
        rawEdges,
        "TB"
      );

      setNodes(layoutedNodes);
      setEdges(layoutedEdges);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full text-lg text-gray-600">
        Carregando topologia...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-red-500">
        <p>Erro ao carregar topologia.</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (!data?.nodes?.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        No topology available.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>

      {selectedNode && (
        <div className="absolute top-0 right-0 w-64 bg-white shadow-lg p-4 border-l z-10">
          <h2 className="font-bold mb-2">Node Details</h2>
          <p>
            <strong>Name:</strong> {selectedNode.data.label}
          </p>
          <p>
            <strong>Type:</strong> {selectedNode.data.nodeType}
          </p>

          {selectedNode.data.nodeType === "device" && (
            <button
              onClick={() => alert(`Alert ${selectedNode.data.label}`)}
              className="mt-3 px-3 py-1 bg-blue-500 text-white rounded"
            >
              Open Asset Drawer
            </button>
          )}

          <button
            onClick={() => setSelectedNode(null)}
            className="mt-3 text-sm text-gray-500 underline"
          >
            Fechar
          </button>
        </div>
      )}
    </div>
  );
}
