import { z } from "zod";

export const KENYAN_CITIES = ["Nairobi", "Mombasa", "Kisumu"] as const;

export const parcelDetailsSchema = z.object({
  weight: z.number().min(0.1, "Enter a weight greater than 0"),
  dimensions: z.string().min(1, "Select a package size"),
  type: z.string().min(1, "Select a parcel type"),
});

export const recipientDetailsSchema = z.object({
  recipientName: z.string().min(1, "Recipient name is required"),
  recipientPhone: z.string().min(7, "Enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.enum(KENYAN_CITIES),
  pickupPoint: z.string().optional(),
});

export const bookingSchema = parcelDetailsSchema.merge(recipientDetailsSchema);

export type BookingValues = z.infer<typeof bookingSchema>;

export const BASE_COST_KSH = 200;
export const COST_PER_KG_KSH = 50;

export function estimateCost(weight: number): number {
  return BASE_COST_KSH + weight * COST_PER_KG_KSH;
}
