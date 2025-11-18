"use client";

import { useState } from "react";
import { useDevices } from "@/application/hooks/useDevices";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { DeviceProps } from "@/domain/types/device/DeviceProps";
import { DeviceInfo } from "@/components/ui/devices/deviceInfo";
import { DeviceMap } from "@/components/ui/devices/deviceMap";

export default function DevicesPage() {
  const { data, isLoading } = useDevices();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>();

  const selectedDevice = data?.find((d: DeviceProps) => d.id === selectedDeviceId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Select
          onValueChange={(value) => setSelectedDeviceId(value)}
          value={selectedDeviceId}
        >
          <SelectTrigger className="w-[260px]">
            <SelectValue placeholder="Select a device" />
          </SelectTrigger>
          <SelectContent>
            {data?.map((device) => (
              <SelectItem key={device.id} value={device.id}>
                {device.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="animate-spin w-6 h-6 mr-2" />
          <span>Loading...</span>
        </div>
      ) : (
        <motion.div
          className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="lg:col-span-2">
            {selectedDevice && <DeviceInfo device={selectedDevice} />}
          </div>
          <div className="lg:col-span-10">
            {selectedDevice ? (
              <DeviceMap selectedDeviceId={selectedDevice.gatewayId} />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground border rounded-lg">
                <p>Select a device to view on map</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
