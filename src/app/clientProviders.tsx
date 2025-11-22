"use client";
import "@/app/globals.css";
import { useSidebarStore } from "@/application/store/useSidebarStore";
import { SideBar } from "@/interface/components/sideBar/SideBar";
import { SidebarToggle } from "@/interface/components/sideBar/SidebarToggle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex flex-col flex-1">
          <header className="md:hidden p-4">
            <div
              className="p-2 bg-primary text-white rounded"
              onClick={() => useSidebarStore.getState().toggle()}
            >
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 w-full">{children}</main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
