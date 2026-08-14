import { describe, expect, it } from "vitest";
import { trackingStepIndex } from "./tracking";
import type { ParcelStatus } from "@/types/models";

describe("trackingStepIndex", () => {
  it("maps each status to its step index", () => {
    expect(trackingStepIndex("PENDING")).toBe(0);
    expect(trackingStepIndex("IN_TRANSIT")).toBe(2);
    expect(trackingStepIndex("DELIVERED")).toBe(4);
    expect(trackingStepIndex("FAILED")).toBe(2);
  });

  it("falls back to the first step for an unrecognized status", () => {
    expect(trackingStepIndex("UNKNOWN" as ParcelStatus)).toBe(0);
  });
});
