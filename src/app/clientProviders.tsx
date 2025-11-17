"use client";
import "@/app/globals.css";
import { SideBar } from "@/interface/components/sideBar/SideBar";
import { Header } from "@/interface/components/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SideBar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </QueryClientProvider>
  );
}
