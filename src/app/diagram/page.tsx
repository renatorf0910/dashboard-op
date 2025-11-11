"use client";

import { useState, useCallback, useEffect } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTopology } from "@/application/hooks/useTopology";

export default function Page() {
  const assetId = "s1";
  const { data, isLoading, isError } = useTopology(assetId);

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    if (data) {
      const mappedNodes = data.nodes.map((n, index) => ({
        id: n.id,
        data: { label: `${n.name} (${n.nodeType})` },
        position: { x: 100 * index, y: 100 * (n.nodeType === "device" ? 2 : n.nodeType === "gateway" ? 1 : 0) },
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
    }
  }, [data]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  if (isLoading) return <div className="flex items-center justify-center h-screen text-lg">Carregando topologia...</div>;
  if (isError) return <div className="flex items-center justify-center h-screen text-red-500">Erro ao carregar topologia.</div>;

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
      {/* 🔹 Você pode abrir o drawer ao clicar em um node depois */}
      {/* <AssetDetailsDrawer /> */}
    </div>
  );
}
