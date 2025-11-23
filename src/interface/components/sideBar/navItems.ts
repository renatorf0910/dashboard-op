import { TabletSmartphone, Server, X, ShieldAlert } from "lucide-react";

export const navItems = [
    {
        label: "Assets",
        href: "/assets",
        icon: Server
    },
    {
        label: "Devices",
        href: "/devices",
        icon: TabletSmartphone
    },
    {
        label: "Error",
        href: "/error",
        icon: X
    },
    {
        label: "Not found",
        href: "/notfound",
        icon: ShieldAlert
    },
];
