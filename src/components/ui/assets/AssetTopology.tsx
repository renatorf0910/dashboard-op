"use client";

import React, { useMemo } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useTopology } from "@/application/hooks/useTopology";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AssetTopologyProps {
  assetId?: string;
}

export function AssetTopology({ assetId }: AssetTopologyProps) {
  const { data, isLoading, isError, refetch } = useTopology(assetId);

  const { nodes, edges } = useMemo(() => {
    if (!data) return { nodes: [], edges: [] };

    const nodes: Node[] = data.nodes.map((n, index) => ({
      id: n.id,
      data: { label: n.name },
      position: {
        x:
          n.nodeType === "site"
            ? 0
            : n.nodeType === "gateway"
            ? 250
            : 500,
        y: index * 100,
      },
      style: {
        border:
          n.nodeType === "site"
            ? "2px solid #2563eb"
            : n.nodeType === "gateway"
            ? "2px solid #16a34a"
            : "2px solid #ca8a04",
        borderRadius: 8,
        padding: 6,
        background: "#fff",
        fontSize: 12,
      },
    }));

    const edges: Edge[] = data.edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      markerEnd: { type: MarkerType.Arrow },
    }));

    return { nodes, edges };
  }, [data]);

  if (isLoading)
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <Skeleton className="w-1/2 h-8" />
      </Card>
    );

  if (isError)
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Err loading topology.
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={() => refetch()}
          >
            Retry
          </Button>
        </AlertDescription>
      </Alert>
    );

  if (!nodes.length)
    return (
      <Card className="w-full h-[300px] flex items-center justify-center text-gray-500 text-sm">
        Empty
      </Card>
    );

  return (
    <Card className="w-full h-[400px] border rounded-lg mt-4">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
      >
        <MiniMap />
        <Controls />
        <Background gap={16} />
      </ReactFlow>
    </Card>
  );
}
