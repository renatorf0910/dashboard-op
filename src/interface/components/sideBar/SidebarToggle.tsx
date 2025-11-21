"use client";

import { useSidebarStore } from "@/application/store/useSidebarStore";
import { Menu, ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";

export function SidebarToggle() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <motion.div
      whileHover={{ scale: 2 }}
      className="flex items-center  py-2 rounded-md transition-all duration-300 relative"
    >
      <button
        onClick={toggle}
        className="flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 relative"
      >
        {isOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
      </button>
    </motion.div>
  );
}
