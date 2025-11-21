"use client";

import { useSidebarStore } from "@/application/store/useSidebarStore";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.06 }}
      className="
        absolute top-1/2 -right-5 transform -translate-y-1/2
        w-9 h-9 rounded-full bg-primary opacity-80
        shadow-lg border border-zinc-300 
        flex items-center justify-center
        transition-all duration-300 z-50
      "
      >
      {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </motion.button>
  );
}
