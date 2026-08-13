import type { Role } from "@/types/models";

export const adminSummary = {
  totalUsers: 12543,
  activeDrivers: 450,
  parcelsToday: 3290,
  revenueToday: 450200,
};

export const deliveryTrend = [
  { day: "1", deliveries: 65 },
  { day: "3", deliveries: 59 },
  { day: "5", deliveries: 80 },
  { day: "7", deliveries: 81 },
  { day: "9", deliveries: 56 },
  { day: "11", deliveries: 55 },
  { day: "13", deliveries: 40 },
  { day: "15", deliveries: 70 },
  { day: "17", deliveries: 90 },
  { day: "19", deliveries: 100 },
  { day: "21", deliveries: 120 },
  { day: "23", deliveries: 110 },
  { day: "25", deliveries: 150 },
  { day: "27", deliveries: 140 },
  { day: "29", deliveries: 130 },
  { day: "30", deliveries: 200 },
];

export const statusBreakdown = [
  { status: "Delivered", value: 350, color: "var(--success)" },
  { status: "In transit", value: 450, color: "var(--info)" },
  { status: "Pending", value: 100, color: "var(--warning)" },
  { status: "Failed", value: 50, color: "var(--destructive)" },
];

export const topCities = [
  { city: "Nairobi", volume: 6500 },
  { city: "Mombasa", volume: 2400 },
  { city: "Kisumu", volume: 1800 },
  { city: "Nakuru", volume: 900 },
  { city: "Eldoret", volume: 600 },
];

export type ServiceStatus = "operational" | "degraded" | "down";

export const systemServices: { name: string; status: ServiceStatus }[] = [
  { name: "Tracking service", status: "operational" },
  { name: "Payment service", status: "operational" },
  { name: "Notification service", status: "degraded" },
  { name: "Map routing engine", status: "operational" },
];

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Suspended";
  joined: string;
}

export const adminUsers: AdminUser[] = [
  {
    id: "usr1",
    name: "Peter Karanja",
    email: "peter@example.com",
    role: "DRIVER",
    status: "Active",
    joined: "2026-01-12",
  },
  {
    id: "usr2",
    name: "Alice Wakesho",
    email: "alice@example.com",
    role: "SENDER",
    status: "Active",
    joined: "2026-01-15",
  },
  {
    id: "usr3",
    name: "Bazaar Hub",
    email: "hub@bazaar.co.ke",
    role: "PICKUP",
    status: "Active",
    joined: "2026-02-20",
  },
  {
    id: "usr4",
    name: "John Doe",
    email: "johndoe@example.com",
    role: "DRIVER",
    status: "Suspended",
    joined: "2026-03-10",
  },
];
