import type { Stat } from "@/types/models";

export const senderStats: Stat[] = [
  { label: "Active parcels", value: 6, change: 12, icon: "Truck" },
  { label: "Delivered this month", value: 24, change: 8, icon: "CheckCircle2" },
  { label: "Avg. delivery time", value: 2.3, icon: "Clock" },
  { label: "Spend (Ksh)", value: 18400, change: -4, icon: "Wallet" },
];

export const adminStats: Stat[] = [
  { label: "Total parcels", value: 1284, change: 6, icon: "ClipboardList" },
  { label: "Active drivers", value: 32, change: 3, icon: "Users" },
  { label: "Revenue (Ksh)", value: 942000, change: 9, icon: "Wallet" },
  { label: "Success rate", value: 96.4, change: 1.2, icon: "CheckCircle2" },
];
