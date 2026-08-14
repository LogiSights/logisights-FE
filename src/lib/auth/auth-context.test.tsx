import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider, useAuth } from "./auth-context";
import type { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => <AuthProvider>{children}</AuthProvider>;

async function loginAndWait(
  result: { current: ReturnType<typeof useAuth> },
  email: string,
  role?: Parameters<ReturnType<typeof useAuth>["login"]>[1]
) {
  let loginPromise!: Promise<unknown>;
  act(() => {
    loginPromise = result.current.login(email, role);
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1500);
    await loginPromise;
  });
}

describe("useAuth", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("throws when used outside an AuthProvider", () => {
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/);
  });

  it("starts hydrated with no user when storage is empty", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isHydrated).toBe(true);
    expect(result.current.user).toBeNull();
  });

  it("logs in and persists the user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await loginAndWait(result, "jane@example.com", "DRIVER");

    expect(result.current.user).toMatchObject({ email: "jane@example.com", role: "DRIVER" });
  });

  it("logs out and clears the user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await loginAndWait(result, "jane@example.com");
    expect(result.current.user).not.toBeNull();

    act(() => result.current.logout());
    expect(result.current.user).toBeNull();
  });

  it("switches the role of the logged-in user", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    await loginAndWait(result, "jane@example.com", "SENDER");

    act(() => result.current.switchRole("ADMIN"));
    expect(result.current.user?.role).toBe("ADMIN");
  });

  it("switchRole is a no-op when nobody is logged in", () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => result.current.switchRole("ADMIN"));
    expect(result.current.user).toBeNull();
  });
});
