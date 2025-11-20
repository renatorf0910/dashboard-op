"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useDeviceStore } from "@/application/store/useDeviceStore";
import { DeviceMap } from "@/components/ui/devices/deviceMap";
import { Section } from "../section";
import { InfoGrid } from "@/components/info-grid";
import { InfoItem } from "../info-item";
import { AssetButton } from "../button";
import { DialogTitle } from "@radix-ui/react-dialog";

export function DeviceDetailsDialog() {
    const { device, isOpen, closeDrawer } = useDeviceStore();
    
    return (
        <Dialog open={isOpen} onOpenChange={(o) => (!o ? closeDrawer() : null)}>
            <DialogTitle></DialogTitle>
            <DialogContent
                className="max-h-[90vh] overflow-y-auto"
                size="xl"
            >
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
                        <InfoItem label="Asset Name" value={device?.asset?.name} />
                        <InfoItem label="Asset ID" value={device?.asset?.id} />
                        <InfoItem label="Location" value={device?.asset?.location} />
                        <InfoItem label="Risk Level" value={device?.asset?.risk} />
                        <InfoItem value={ <AssetButton assetId={device?.assetId!} /> }
                        />
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
                        {device && (
                            <DeviceMap selectedDeviceId={device.gatewayId} />
                        )}
                    </div>
                </Section>
            </DialogContent>
        </Dialog>
    );
}

