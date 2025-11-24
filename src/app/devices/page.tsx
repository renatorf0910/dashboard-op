import { ErrorBoundary } from "@/components/error/errorBoundary";
import DevicesPage from "@/interface/pages/devices/DevicesPage";
import "@xyflow/react/dist/style.css";
import { Suspense } from "react";

export const metadata = {
  title: 'Devices',
};


export default function Page() {
  return (
    <>
      <Suspense>
        <ErrorBoundary>
          <DevicesPage />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
