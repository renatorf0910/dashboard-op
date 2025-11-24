"use client";
import { ErrorBoundary } from "@/components/error/errorBoundary";
import { Badge } from "@/components/ui/badge";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { AssetDetailsDrawerProps } from "@/domain/types/assets/AssetsProps";
import { motion } from "framer-motion";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";
import { RiskBadge } from "../badge-risk";
import { SkeletonCard } from "../card-skeleton";
import { InfoItemInLine } from "../info-item";
import { LocationBadge } from "../location-badge";
import { ErrorState } from "../errorState";
import { useRouter } from "next/navigation";
import { useVulnerabilities } from "@/application/hooks/useVulnerabilities";

export function AssetDetailsDrawer({
  open,
  onOpenChange,
  asset,
  isLoading = false,
  children,
}: AssetDetailsDrawerProps) {
  const router = useRouter();

  const {
    vulnerabilities,
    isLoadingVulnerabilities,
    isErrorVulnerabilities,
    errorVulnerabilities,
  } = useVulnerabilities(asset?.id || "");

  if (isErrorVulnerabilities) {
    return (
      <ErrorState
        message="Error to loading Vulnerabilities."
        onRetry={() => router.refresh()}
        details={errorVulnerabilities?.message}
      />
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent>
        <ErrorBoundary fallback={"Error to render content"}>
          <div className="p-4 md:p-6 overflow-y-auto space-y-10 h-full w-full bg-linear-to-b from-gray-50 to-white">
            {asset ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 10, x: 0 }}
                transition={{ duration: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2 text-gray-800">
                  <Info className="h-5 w-5 text-blue-500" />
                  <h2 className="text-xl font-semibold">{asset.name}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <InfoItemInLine label="Location" value={<LocationBadge code={asset.location} />} />
                  <InfoItemInLine className="mt-1" label="Risk" value={<RiskBadge risk={asset.risk} />} />
                  <InfoItemInLine label="Risk Score" value={asset.riskScore} />
                  <InfoItemInLine label="Supplier" value={asset.supplier} />
                </div>

              </motion.div>
            ) : (
              <p className="text-muted-foreground text-sm text-center">
                No asset selected.
              </p>
            )}
            <Separator />
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Vulnerabilities
              </h4>

              {isLoading && <SkeletonCard />}

              {!isLoadingVulnerabilities && vulnerabilities && vulnerabilities.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2 }}
                >
                  {vulnerabilities.map((vuln) => (
                    <div
                      key={vuln.id}
                      className="p-4 flex justify-between items-start transition"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <ShieldAlert className="h-4 w-4 text-gray-500" />
                          <span className="font-medium text-gray-800 mr-2">
                            {vuln.title}
                          </span>
                          <RiskBadge risk={vuln.severity} />
                        </div>
                        <div className="text-sm text-gray-600 flex flex-col gap-0.5">
                          <InfoItemInLine label="Scope" value={vuln.scope} />
                          <InfoItemInLine label="Ref ID" value={vuln.refId} />
                          <InfoItemInLine label="CVSS" value={vuln.cvss} />
                          <RiskBadge risk={vuln.acknowledged} />
                          <Separator className="mt-4 flex justify-between items-center" />
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div>{children}</div>
            </motion.div>

          </div>
        </ErrorBoundary>
      </DrawerContent>
    </Drawer>
  );
}
