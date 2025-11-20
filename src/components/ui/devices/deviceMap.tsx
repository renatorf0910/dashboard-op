"use client";

import { Diagram } from "@/components/diagram/diagram";
import { ReactFlowProvider } from "@xyflow/react";

export function DeviceMap({ selectedDeviceId }: { selectedDeviceId?: string }) {
  return (
    <ReactFlowProvider>

      <div className="w-full h-[100vh] border rounded-lg overflow-hidden">
        <Diagram selectedNodeId={selectedDeviceId} />
      </div>
    </ReactFlowProvider>
  );
}
