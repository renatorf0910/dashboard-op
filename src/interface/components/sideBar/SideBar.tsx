"use client";

import { motion } from "framer-motion";
import { navItems } from "./navItems";
import { SideBarItem } from "./SideBarItem";
import { SidebarToggle } from "./SidebarToggle";
import { useSidebarStore } from "@/application/store/useSidebarStore";
import Image from "next/image";
import clsx from "clsx";

export function SideBar() {
  const { isOpen, toggle } = useSidebarStore();

  return (
    <>
      <div
        className={clsx(
          "fixed inset-0 bg-black/50 z-20 transition-opacity md:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
        onClick={toggle}
      />
      <motion.aside
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="fixed z-30 h-full flex flex-col bg-primary text-primary-foreground shadow-lg w-64 md:hidden"
      >
        <div className="relative flex items-center justify-between px-4 h-16">
          {isOpen && (
            <Image
              src="/images/logo.png"
              alt="logo"
              width={150}
              height={40}
              className="transition-all duration-300"
            />
          )}
          <SidebarToggle />
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </motion.aside>
      <motion.aside
        initial={{ width: 72 }}
        animate={{ width: isOpen ? 210 : 72 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="hidden md:flex h-full flex-col bg-primary text-primary-foreground shadow-sm"
      >
        <div className="relative flex items-center justify-between px-2 mt-4 h-16 transition-all">
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            className="absolute left-2"
          >
            <Image
              src="/images/logo.png"
              alt="logo"
              width={175}
              height={40}
            />
          </motion.div>
          <motion.div
            initial={false}
            animate={{ opacity: isOpen ? 0 : 1 }}
            className="flex items-center gap-3 px-3 py-2 relative"
          >
            <Image
              src="/images/favicon1.png"
              alt="logo"
              width={35}
              height={20}
            />
          </motion.div>
          <SidebarToggle />
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              label={item.label}
              icon={item.icon}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
