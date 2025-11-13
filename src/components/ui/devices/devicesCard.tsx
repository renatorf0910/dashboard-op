"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Monitor, Router } from "lucide-react";
import { DeviceProps } from "@/domain/types/device/DeviceProps";

export function DeviceCard({ device }: { device: DeviceProps }) {
  const isSensor = device.type === "sensor";
  const Icon = isSensor ? Monitor : Router;

  return (
    <Card
      className={cn(
        "transition-all hover:shadow-lg cursor-pointer",
        "flex flex-col justify-between h-full"
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
          {device.name}
        </CardTitle>
        <Badge variant={isSensor ? "outline" : "secondary"}>
          {device.type}
        </Badge>
      </CardHeader>

      <CardContent className="text-sm text-muted-foreground space-y-1">
        <p>ID: {device.id}</p>
        <p>Asset: {device.assetId}</p>
        <p>Gateway: {device.gatewayId}</p>
      </CardContent>
    </Card>
  );
}
