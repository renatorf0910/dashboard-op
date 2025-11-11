"use client";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AlertTriangle, ShieldAlert, ShieldCheck, Info } from "lucide-react";
import { TypographyKey } from "@/components/ui/typographyKey";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { AssetDetailsDrawerProps } from "@/domain/types/assets/AssetsProps";
import { AssetTopology } from "./AssetTopology";


export function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  vulnerabilities = [],
  isLoading = false,
}: AssetDetailsDrawerProps) {
  const getSeverityBadge = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return <Badge className="bg-red-700 text-white">Critical</Badge>;
      case "high":
        return <Badge className="bg-red-500 text-white">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-500 text-white">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-500 text-white">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-screen overflow-y-auto">
        <ErrorBoundary fallback={"Error to render description"}>
          <div className="p-4 space-y-6">
            {asset ? (
              <Card className="shadow-md border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-500" />
                    {asset.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  {Object.entries(asset).map(([key, value]) => (
                    <TypographyKey
                      key={key}
                      field={`${key}: ${String(value)}`}
                    />
                  ))}
                </CardContent>
              </Card>
            ) : (
              <p className="text-muted-foreground text-sm">
                No asset selected.
              </p>
            )}

            <Separator />
            <div>
              <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Vulnerabilities
              </h4>
              {isLoading && <p>Loading vulnerabilities...</p>}
              {!isLoading && vulnerabilities.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No vulnerabilities found for this asset.
                </p>
              )}
              {!isLoading && vulnerabilities.length > 0 && (
                <div className="grid gap-3">
                  {vulnerabilities.map((vuln) => (
                    <Card
                      key={vuln.id}
                      className="border-l-4 transition-all hover:shadow-md"
                      style={{
                        borderColor:
                          vuln.severity === "high"
                            ? "#ef4444"
                            : vuln.severity === "medium"
                              ? "#facc15"
                              : vuln.severity === "low"
                                ? "#22c55e"
                                : "#7f1d1d",
                      }}
                    >
                      <CardHeader className="flex flex-row items-center justify-between p-4">
                        <CardTitle className="text-base font-medium">
                          {vuln.title}
                        </CardTitle>
                        {getSeverityBadge(vuln.severity)}
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground grid gap-1">
                        <p>
                          <strong>Scope:</strong> {vuln.scope}
                        </p>
                        <p>
                          <strong>Ref ID:</strong> {vuln.refId}
                        </p>
                        <p>
                          <strong>CVSS:</strong> {vuln.cvss}
                        </p>
                        <p>
                          <strong>Acknowledged:</strong>{" "}
                          {vuln.acknowledged ? "✅ Yes" : "❌ No"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </ErrorBoundary>
        <Separator />

        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Network Topology</h3>
          <AssetTopology assetId={asset?.id} />
        </div>

        <div className="flex justify-end p-4">
          <DrawerClose asChild>
            <Button variant="secondary">Close</Button>
          </DrawerClose>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
