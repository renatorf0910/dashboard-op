import { ErrorBoundary } from "@/components/error/errorBoundary";
import AssetsPage from "@/interface/pages/assets/AssetsPage";
import { Suspense } from "react";

export const metadata = {
  title: "Assets",
};

export default function Page() {
  return (
    <>
      <Suspense>
        <ErrorBoundary>
          <AssetsPage />
        </ErrorBoundary>
      </Suspense>
    </>
  )
}
