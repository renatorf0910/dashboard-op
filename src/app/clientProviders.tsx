"use client";
import "@/app/globals.css";
import { SideBar } from "@/interface/components/sideBar/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen overflow-hidden">
        <SideBar />
        <div className="flex flex-col flex-1">
          <main className="flex-1 p-6 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}
