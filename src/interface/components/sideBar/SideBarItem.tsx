"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import clsx from "clsx";

export function SideBarItem({ label, href, icon: Icon, isOpen }: any) {
  const pathname = usePathname();
  const active = pathname.startsWith(href);

  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className={clsx(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          active
            ? "bg-primary text-[var(--primary-side-bar)]"
            : "hover:bg-muted text-[var(--primary-side-bar)]"
        )}
      >
        <Icon size={15} />
        {isOpen && <span className="font-medium">{label}</span>}
      </motion.div>
    </Link>
  );
}