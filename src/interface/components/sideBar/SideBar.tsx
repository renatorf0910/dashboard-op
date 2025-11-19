"use client";

import { motion } from "framer-motion";
import { navItems } from "./navItems";
import { SideBarItem } from "./SideBarItem";
import { SidebarToggle } from "./SidebarToggle";
import { useSidebarStore } from "@/application/store/useSidebarStore";

export function SideBar() {
    const { isOpen } = useSidebarStore();

    return (
        <motion.aside
            initial={{ width: 0 }}
            animate={{ width: isOpen ? 240 : 72 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="
                hidden md:flex h-full 
                flex-col border-r border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-900 shadow-sm
            "
        >
            <div className="flex items-center justify-between px-4 h-16">
                {isOpen && <h1 className="font-bold text-xl">Dashboard</h1>}
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
