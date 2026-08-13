export type DeliveryTaskStatus = "PENDING" | "PICKED_UP" | "IN_TRANSIT" | "DELIVERED";

export interface DeliveryTask {
  id: string;
  recipientName: string;
  address: string;
  distanceKm: number;
  timeWindow: string;
  status: DeliveryTaskStatus;
  history: DeliveryTaskStatus[];
}

export const driverTasks: DeliveryTask[] = [
  {
    id: "KE-101",
    recipientName: "Alice Kamau",
    address: "42 Waiyaki Way, Nairobi",
    distanceKm: 1.2,
    timeWindow: "14:00 - 15:00",
    status: "PENDING",
    history: [],
  },
  {
    id: "KE-102",
    recipientName: "Brian Mwangi",
    address: "Ring Road, Parklands",
    distanceKm: 2.5,
    timeWindow: "15:30 - 16:30",
    status: "PENDING",
    history: [],
  },
  {
    id: "KE-103",
    recipientName: "Cynthia Njeri",
    address: "Lavington Mall",
    distanceKm: 4.8,
    timeWindow: "16:30 - 18:00",
    status: "PENDING",
    history: [],
  },
  {
    id: "KE-104",
    recipientName: "Diana Wambui",
    address: "Kilimani, Argwings Kodhek",
    distanceKm: 6.1,
    timeWindow: "18:00 - 19:30",
    status: "PENDING",
    history: [],
  },
  {
    id: "KE-105",
    recipientName: "Evans Simiyu",
    address: "Ngong Road",
    distanceKm: 8.0,
    timeWindow: "19:30 - 20:00",
    status: "PENDING",
    history: [],
  },
];

export const EARNINGS_PER_DELIVERY_KSH = 150;
