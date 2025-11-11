"use client";

import { useState, useEffect, useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTopology } from "@/application/hooks/useTopology";
import { DiagramProps } from "@/domain/types/topology/TopologyProps";

export function Diagram({ assetId }: DiagramProps) {
  const { data, isLoading, isError } = useTopology(assetId);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    if (data?.nodes?.length) {
      const mappedNodes = data.nodes.map((n, index) => ({
        id: n.id,
        data: { label: n.label, nodeType: n.nodeType },
        position: {
          x: (index % 10) * 200,
          y:
            n.nodeType === "site"
              ? 0
              : n.nodeType === "gateway"
              ? 200
              : 400,
        },
        style: {
          border: "1px solid #999",
          borderRadius: 8,
          padding: 8,
          backgroundColor:
            n.nodeType === "site"
              ? "#c8e6c9"
              : n.nodeType === "gateway"
              ? "#bbdefb"
              : "#ffe0b2",
        },
      }));

      const mappedEdges = data.edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
      }));

      setNodes(mappedNodes);
      setEdges(mappedEdges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [data]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg">
        Carregando topologia...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-red-500">
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
      <div className="flex items-center justify-center h-screen text-gray-500">
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
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      {selectedNode && (
        <div className="absolute top-0 right-0 w-64 bg-white shadow-lg p-4 border-l">
          <h2 className="font-bold mb-2">Node Details</h2>
          <p>
            <strong>Name:</strong> {selectedNode.data.label}
          </p>
          <p>
            <strong>Type:</strong> {selectedNode.data.nodeType}
          </p>
          {selectedNode.data.nodeType === "device" && (
            <button
              onClick={() =>
                alert(
                  `Abrir Asset Drawer para ${selectedNode.data.label}`
                )
              }
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
