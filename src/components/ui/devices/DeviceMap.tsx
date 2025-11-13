"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 150, y: 100 }, data: { label: "Sensor-B1" } },
];
const initialEdges: any[] = [];

export function DeviceMap() {
  return (
    <div className="w-full h-full border rounded-lg overflow-hidden">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
