"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { DeviceMap } from "@/components/ui/devices/deviceMap";
import { Section } from "../section";
import { InfoGrid } from "@/components/info-grid";
import { InfoItem } from "../info-item";
import { AssetButton, Button } from "../button";
import { RiskBadge } from "../badge-risk";
import { LocationBadge } from "../location-badge";
import Link from "next/link";

interface DeviceDetailsDialogProps {
  onClose: () => void;
}

export function DeviceDetailsDialog({ onClose }: DeviceDetailsDialogProps) {
  const { device, isOpen, closeDrawer } = useDeviceStore();

  return (
    <Dialog open={isOpen} onOpenChange={(o) => (!o ? onClose() : null)}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-h-[90vh] overflow-y-auto" size="xl">
        <Section title="Device">
          <InfoGrid>
            <InfoItem label="Name" value={device?.name} />
            <InfoItem label="ID" value={device?.id} />
            <InfoItem label="Type" value={device?.type} />
            <InfoItem label="Asset Reference" value={device?.assetId} />
            <InfoItem label="Gateway Reference" value={device?.gatewayId} />
          </InfoGrid>
        </Section>

        <Section title="Asset">
          <InfoGrid>
            <Link
              href={`/assets/${device?.asset?.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Button className="mt-2" variant='link' style={{ color: "#002177" }}>{device?.asset?.name}</Button>
            </Link>
            <InfoItem label="Location" value={<LocationBadge code={device?.asset?.location ?? ''} />} />
            <InfoItem label="Risk Score" value={device?.asset?.riskScore} />
            <InfoItem label="Risk Level" value={<RiskBadge risk={device?.asset?.risk ?? "-"} />} />
            <InfoItem label="Supplier" value={device?.asset?.supplier} />
          </InfoGrid>
        </Section>

        <Section title="Gateway">
          <InfoGrid>
            <InfoItem label="Gateway Name" value={device?.gateway?.name} />
            <InfoItem label="Gateway ID" value={device?.gateway?.id} />
          </InfoGrid>
        </Section>

        <Section title="Topology">
          <div className="w-full h-[60vh] border rounded-xl overflow-hidden shadow-inner">
            {device && <DeviceMap selectedDeviceId={device.gatewayId} />}
          </div>
        </Section>
      </DialogContent>
    </Dialog>
  );
}
