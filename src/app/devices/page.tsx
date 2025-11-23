import { ErrorBoundary } from "@/components/error/errorBoundary";
import DevicesPage from "@/interface/pages/devices/DevicesPage";
import "@xyflow/react/dist/style.css";

export const metadata = {
  title: 'Devices',
};


export default function Page() {
  return (
    <>
      <ErrorBoundary>
        <DevicesPage />
      </ErrorBoundary>
    </>
  )
}
