"use client";

import { Diagram } from "@/components/diagram/diagram";
import { ReactFlowProvider } from "@xyflow/react";
import { AssetDetailsDrawerContainer } from "../assets/AssetDetailsDrawerContainer";

export function DeviceMap({ selectedDeviceId }: { selectedDeviceId?: string }) {
  return (
    <ReactFlowProvider>

      <div className="w-full h-full">
        <Diagram selectedNodeId={selectedDeviceId} />
        <AssetDetailsDrawerContainer />
      </div>
    </ReactFlowProvider>
  );
}
