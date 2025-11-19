"use client";

import { Drawer } from "@/components/ui/drawer";
import { DeviceMap } from "@/components/ui/devices/deviceMap";
import { DeviceInfo } from "@/components/ui/devices/deviceInfo";
import { useDeviceStore } from "@/application/store/useDeviceStore";

export function DeviceDetailsDrawer() {
  const { device, isOpen, closeDrawer } = useDeviceStore();

  return (
    <Drawer open={isOpen} onOpenChange={(o) => (o ? null : closeDrawer())}>
      <div className="p-6 flex flex-col gap-6">
        {device && <DeviceInfo device={device} />}

        {device && (
          <div className="border rounded-lg overflow-hidden">
            <DeviceMap selectedDeviceId={device.gatewayId} />
          </div>
        )}
      </div>
    </Drawer>
  );
}
