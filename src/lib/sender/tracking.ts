import type { ParcelStatus } from "@/types/models";

export const TRACKING_STEPS = [
  "Booked",
  "Collected",
  "In transit",
  "Out for delivery",
  "Delivered",
] as const;

export function trackingStepIndex(status: ParcelStatus): number {
  switch (status) {
    case "PENDING":
      return 0;
    case "IN_TRANSIT":
      return 2;
    case "DELIVERED":
      return 4;
    case "FAILED":
      return 2;
    default:
      return 0;
  }
}
