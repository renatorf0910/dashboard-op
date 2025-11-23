import { ErrorBoundary } from "@/components/error/errorBoundary";
import NotFound from "../not-found";

export const metadata = {
  title: "Not found 404",
};

export default function Page() {
  return (
    <>
      <ErrorBoundary>
        <NotFound />
      </ErrorBoundary>
    </>
  )
}
