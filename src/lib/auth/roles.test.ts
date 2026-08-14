import { describe, expect, it } from "vitest";
import { homeForRole, roleForPath } from "./roles";

describe("roleForPath", () => {
  it("resolves the role for each dashboard root", () => {
    expect(roleForPath("/sender")).toBe("SENDER");
    expect(roleForPath("/driver")).toBe("DRIVER");
    expect(roleForPath("/pickup")).toBe("PICKUP");
    expect(roleForPath("/admin")).toBe("ADMIN");
  });

  it("resolves the role for nested paths", () => {
    expect(roleForPath("/sender/book")).toBe("SENDER");
    expect(roleForPath("/sender/track/LGS-123")).toBe("SENDER");
  });

  it("returns undefined for unknown paths", () => {
    expect(roleForPath("/login")).toBeUndefined();
    expect(roleForPath("/")).toBeUndefined();
  });
});

describe("homeForRole", () => {
  it("maps each role to its dashboard root", () => {
    expect(homeForRole("SENDER")).toBe("/sender");
    expect(homeForRole("DRIVER")).toBe("/driver");
    expect(homeForRole("PICKUP")).toBe("/pickup");
    expect(homeForRole("ADMIN")).toBe("/admin");
  });
});
