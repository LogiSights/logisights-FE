import { describe, expect, it } from "vitest";
import { bookingSchema, estimateCost } from "./schemas";

describe("estimateCost", () => {
  it("charges the base cost plus per-kg rate", () => {
    expect(estimateCost(3)).toBe(200 + 3 * 50);
  });

  it("charges only the base cost at zero weight", () => {
    expect(estimateCost(0)).toBe(200);
  });
});

describe("bookingSchema", () => {
  const valid = {
    weight: 2,
    dimensions: "medium",
    type: "PACKAGE",
    recipientName: "Bob",
    recipientPhone: "254700111222",
    address: "Moi Ave",
    city: "Nairobi" as const,
  };

  it("accepts a fully valid booking", () => {
    expect(bookingSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects zero or negative weight", () => {
    expect(bookingSchema.safeParse({ ...valid, weight: 0 }).success).toBe(false);
  });

  it("rejects a city outside the supported list", () => {
    expect(bookingSchema.safeParse({ ...valid, city: "Kampala" }).success).toBe(false);
  });

  it("rejects a missing recipient name", () => {
    expect(bookingSchema.safeParse({ ...valid, recipientName: "" }).success).toBe(false);
  });
});
