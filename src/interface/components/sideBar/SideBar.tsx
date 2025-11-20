"use client";

import { motion } from "framer-motion";
import { navItems } from "./navItems";
import { SideBarItem } from "./SideBarItem";
import { SidebarToggle } from "./SidebarToggle";
import { useSidebarStore } from "@/application/store/useSidebarStore";
import Image from "next/image";

export function SideBar() {
    const { isOpen } = useSidebarStore();

    return (
        <motion.aside
            initial={{ width: 0 }}
            animate={{ width: isOpen ? 240 : 72 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="hidden md:flex h-full flex-col border-r border-border bg-primary text-primary-foreground shadow-sm"
        >
            <div className="flex items-center justify-between px-3 h-16 transition-all duration-500">
                {isOpen && (
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={180}
                        height={40}
                        className="transition-all duration-500"
                    />
                )}
                <SidebarToggle />
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
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
    );
}
