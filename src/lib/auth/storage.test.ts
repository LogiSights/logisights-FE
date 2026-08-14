import { beforeEach, describe, expect, it } from "vitest";
import { clearStoredUser, readStoredUser, writeStoredUser } from "./storage";
import type { User } from "@/types/models";

const user: User = { id: "u1", name: "Jane", email: "jane@example.com", role: "SENDER" };

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("returns null when nothing is stored", () => {
    expect(readStoredUser()).toBeNull();
  });

  it("round-trips a written user", () => {
    writeStoredUser(user);
    expect(readStoredUser()).toEqual(user);
  });

  it("returns null after clearing", () => {
    writeStoredUser(user);
    clearStoredUser();
    expect(readStoredUser()).toBeNull();
  });

  it("returns null for corrupted stored JSON instead of throwing", () => {
    window.localStorage.setItem("logisight_user", "{not valid json");
    expect(readStoredUser()).toBeNull();
  });
});
