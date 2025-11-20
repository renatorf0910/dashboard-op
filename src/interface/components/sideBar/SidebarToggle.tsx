"use client";

import { useSidebarStore } from "@/application/store/useSidebarStore";
import { Menu, ChevronLeft } from "lucide-react";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-md hover:bg-gray-100 transition"
    >
      {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
    </button>
  );
}
