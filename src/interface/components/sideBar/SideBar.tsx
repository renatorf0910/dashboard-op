"use client";

import { navItems } from "./navItems";
import { SideBarItem } from "./SideBarItem";

export function SideBar() {
    return (
        <aside className="hidden md:flex flex-col w-64 bh-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <h1 className="text-xl font-bold mb-8 text-center"></h1>
            <nav className="space-y-2">
                {navItems.map((item) => (
                    <SideBarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        icon={item.icon}
                    />
                ))}
            </nav>
        </aside>
    )
};


