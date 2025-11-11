"use client";
import "@/app/globals.css";
import { SideBar } from "@/interface/components/sideBar/SideBar";
import { Header } from "@/interface/components/header/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" suppressHydrationWarning>
      <QueryClientProvider client={queryClient}>
        <body className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <SideBar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6">
              {children}
            </main>
          </div>
        </body>
      </QueryClientProvider>
    </html>
  )
};


