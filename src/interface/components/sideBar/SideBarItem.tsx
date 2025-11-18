"use client"

import { SideBarItemsProps } from "@/domain/types/sideBar/SideBarItemsProps";
import Link from "next/link"
import { usePathname } from "next/navigation";

export function SideBarItem({ label, href, icon: Icon }: SideBarItemsProps) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link href={href} className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all">
            <Icon size={20} />
            <span className="text-sm">{label}</span>
        </Link>
    )
}