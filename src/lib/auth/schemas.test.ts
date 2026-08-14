import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./schemas";

describe("loginSchema", () => {
  it("accepts a valid login", () => {
    const result = loginSchema.safeParse({ email: "jane@example.com", password: "password123" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "password123" });
    expect(result.success).toBe(false);
  });

  it("rejects a short password", () => {
    const result = loginSchema.safeParse({ email: "jane@example.com", password: "short" });
    expect(result.success).toBe(false);
  });
});

describe("registerSchema", () => {
  const base = {
    fullName: "Jane Sender",
    email: "jane@example.com",
    phone: "254712345678",
    password: "password123",
    confirmPassword: "password123",
    role: "SENDER" as const,
  };

  it("accepts a valid registration", () => {
    expect(registerSchema.safeParse(base).success).toBe(true);
  });

  it("rejects mismatched passwords", () => {
    const result = registerSchema.safeParse({ ...base, confirmPassword: "different123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].path).toEqual(["confirmPassword"]);
    }
  });

  it("rejects an admin role", () => {
    const result = registerSchema.safeParse({ ...base, role: "ADMIN" });
    expect(result.success).toBe(false);
  });
});
