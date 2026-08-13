import type { ParcelStatus } from "@/types/models";

export interface PickupInventoryItem {
  id: string;
  recipientName: string;
  phone: string;
  dateArrived: string;
  daysWaiting: number;
  status: Extract<ParcelStatus, "PENDING" | "FAILED">;
}

export interface PickupActivityEvent {
  id: string;
  time: string;
  staff: string;
  action: string;
  parcelId: string;
  type: "in" | "out";
}

export const pickupInventory: PickupInventoryItem[] = [
  {
    id: "KE-2001",
    recipientName: "Sarah Jerop",
    phone: "0712 345 678",
    dateArrived: "2026-08-13T08:00:00.000Z",
    daysWaiting: 0,
    status: "PENDING",
  },
  {
    id: "KE-1984",
    recipientName: "Michael Tenge",
    phone: "0734 556 112",
    dateArrived: "2026-08-11T10:30:00.000Z",
    daysWaiting: 2,
    status: "PENDING",
  },
  {
    id: "KE-1900",
    recipientName: "Evans Kiplagat",
    phone: "0799 223 344",
    dateArrived: "2026-08-09T09:15:00.000Z",
    daysWaiting: 4,
    status: "FAILED",
  },
];

export const pickupActivity: PickupActivityEvent[] = [
  {
    id: "a1",
    time: "2026-08-13T09:40:00.000Z",
    staff: "You",
    action: "Checked out",
    parcelId: "KE-1995",
    type: "out",
  },
  {
    id: "a2",
    time: "2026-08-13T08:20:00.000Z",
    staff: "You",
    action: "Checked in",
    parcelId: "KE-2001",
    type: "in",
  },
];

export const pickupSummary = {
  checkedInToday: 12,
  checkedOutToday: 45,
};
