"use client";

import {
  createContext,
  useCallback,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { Role, User } from "@/types/models";
import { clearStoredUser, readStoredUser, writeStoredUser } from "./storage";

interface AuthContextValue {
  user: User | null;
  isHydrated: boolean;
  login: (email: string, role?: Role) => Promise<User>;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const LOGIN_DELAY_MS = 1500;
const AUTH_EVENT = "logisight-auth-change";
const HYDRATED_SENTINEL = Symbol("not-hydrated");

function subscribe(onStoreChange: () => void) {
  window.addEventListener(AUTH_EVENT, onStoreChange);
  return () => window.removeEventListener(AUTH_EVENT, onStoreChange);
}

function notify() {
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function getServerSnapshot(): User | null | typeof HYDRATED_SENTINEL {
  return HYDRATED_SENTINEL;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, readStoredUser, getServerSnapshot);
  const isHydrated = snapshot !== HYDRATED_SENTINEL;
  const user = isHydrated ? (snapshot as User | null) : null;

  const login = useCallback(async (email: string, role: Role = "SENDER") => {
    const nextUser: User = { id: "u1", name: "Demo User", email, role };
    await new Promise((resolve) => setTimeout(resolve, LOGIN_DELAY_MS));
    writeStoredUser(nextUser);
    notify();
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    notify();
  }, []);

  const switchRole = useCallback((role: Role) => {
    const current = readStoredUser();
    if (!current) return;
    writeStoredUser({ ...current, role });
    notify();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isHydrated, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
