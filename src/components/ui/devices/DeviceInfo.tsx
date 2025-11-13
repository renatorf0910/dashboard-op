"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DeviceProps } from "@/domain/types/device/DeviceProps";

export function DeviceInfo({ device }: { device: DeviceProps }) {
  if (!device) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
        <p>Empty select.</p>
      </div>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {device.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><strong>ID:</strong> {device.id}</p>
        <p><strong>Asset:</strong> {device.assetId}</p>
        <p><strong>Gateway:</strong> {device.gatewayId}</p>
        <p><strong>Type:</strong> <Badge>{device.type}</Badge></p>
      </CardContent>
    </Card>
  );
}
