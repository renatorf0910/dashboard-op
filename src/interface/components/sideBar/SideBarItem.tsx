"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";
import { SideBarItemsProps } from "@/domain/types/sideBar/SideBarItemsProps";

export function SideBarItem({ label, href, icon: Icon, isOpen }: SideBarItemsProps) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-300 relative",
          active
            ? "bg-primary text-white shadow-2xl -translate-y-1"
            : "text-primary-side-bar hover:bg-[#001550] hover:text-white"
        )}
      >
        {active && (
          <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-md"></span>
        )}
        <Icon size={15} />
        {isOpen && (
          <span className="hidden md:inline font-medium">{label}</span>
        )}
      </motion.div>
    </Link>
  );
}
