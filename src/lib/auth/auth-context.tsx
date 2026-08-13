"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setIsHydrated(true);
  }, []);

  const login = useCallback(async (email: string, role: Role = "SENDER") => {
    const nextUser: User = { id: "u1", name: "Demo User", email, role };
    await new Promise((resolve) => setTimeout(resolve, LOGIN_DELAY_MS));
    writeStoredUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  const switchRole = useCallback((role: Role) => {
    setUser((current) => {
      if (!current) return current;
      const updated = { ...current, role };
      writeStoredUser(updated);
      return updated;
    });
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
