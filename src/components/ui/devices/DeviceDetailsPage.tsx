"use client";

import { useDeviceStore } from "@/application/store/useDeviceStore";
import { InfoItem } from "../info-item";
import { RiskBadge } from "@/components/ui/badge-risk";
import { LocationBadge } from "@/components/ui/location-badge";
import { Button } from "@/components/ui/button";
import { DeviceMap } from "@/components/ui/devices/deviceMap";
import Link from "next/link";
import { SkeletonCard } from "../card-skeleton";
import { useRouter } from "next/navigation";
import { Undo2 } from "lucide-react";

export default function DeviceDetailsPage() {
  const router = useRouter();
  const { device, clearDevice } = useDeviceStore();

  if (!device) return <SkeletonCard />;

  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] p-6">
      <div className="mb-4">
        <Button
          className="cursor-pointer"
          variant="default"
          onClick={() => {
            clearDevice();
            router.back();
          }}
        >
          <Undo2 className="mr-1" /> Back to Devices
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-4 space-y-10">

          <SectionBlock title=" ">
            <UniformGrid>
              <InfoItem label="Name" value={device.name} badge />
              <InfoItem label="ID" value={device.id} badge />
              <InfoItem label="Type" value={device.type} badge />
              <InfoItem label="Asset Reference" value={device.assetId} badge />
              <InfoItem label="Gateway Reference" value={device.gatewayId} badge />
            </UniformGrid>
          </SectionBlock>

          <SectionBlock title="">
            <UniformGrid>
              <InfoItem
                label="Asset name"
                value={
                  <Link href={`/assets/${device.asset?.id}`}>
                    <Button style={{ color: "#002177" }} variant="link" className="pl-0">
                      {device.asset?.name}
                    </Button>
                  </Link>
                }
              />

              <InfoItem
                label="Location"
                value={<LocationBadge code={device.asset?.location ?? ""} />}
              />
              <InfoItem label="Risk Score" value={device.asset?.riskScore} badge />
              <InfoItem
                label="Risk Level"
                value={<RiskBadge risk={device.asset?.risk ?? "-"} />}
              />
              <InfoItem label="Supplier" value={device.asset?.supplier} badge />
            </UniformGrid>
          </SectionBlock>
          <SectionBlock title="">
            <UniformGrid>
              <InfoItem label="Gateway Name" value={device.gateway?.name} badge />
              <InfoItem label="Gateway ID" value={device.gateway?.id} badge />
            </UniformGrid>
          </SectionBlock>

        </div>
        <div className="col-span-12 xl:col-span-8">
          <SectionBlock title="">
            <div className="w-full h-[75vh] border rounded-xl bg-white shadow-sm overflow-hidden">
              <DeviceMap selectedDeviceId={device.gatewayId} />
            </div>
          </SectionBlock>
        </div>

      </div>
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-primary">{title}</h2>
      <div className="mt-2 mb-4 w-full border-b border-gray-300" />
      {children}
    </section>
  );
}

function UniformGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {children}
    </div>
  );
}
