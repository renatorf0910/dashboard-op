import { LucideIcon } from "lucide-react";

export interface SideBarItemsProps {
    label: string;
    href: string;
    icon: LucideIcon; 
}

export type SidebarStore = {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
};
