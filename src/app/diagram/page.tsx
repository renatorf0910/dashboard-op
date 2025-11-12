"use client";

import { useState, useCallback, useEffect } from "react";
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useTopology } from "@/application/hooks/useTopology";
import { Diagram } from "@/components/diagram/diagram";

export default function Page() {
  return <Diagram />
}
