import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, Truck, PackageSearch, ClipboardList } from "lucide-react";
import type { Role } from "@/types/models";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: Record<Role, NavItem[]> = {
  SENDER: [
    { label: "Dashboard", href: "/sender", icon: LayoutDashboard },
    { label: "Book a parcel", href: "/sender/book", icon: PackageSearch },
  ],
  DRIVER: [{ label: "Dashboard", href: "/driver", icon: Truck }],
  PICKUP: [{ label: "Dashboard", href: "/pickup", icon: ClipboardList }],
  ADMIN: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
};
