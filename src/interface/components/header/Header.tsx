"use client";

import { Bell, UserCircle } from "lucide-react";


export function Header() {
    return (
        <header className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
            <h2 className="text-lg font-semibold" />
            <div className="flex items-center gap-4">
                Welcome, Admin <UserCircle size={28} className="text-gray-1000" />
            </div>
        </header>
    )
};
