import type { User } from "@/types/models";

const STORAGE_KEY = "logisight_user";

let cachedRaw: string | null = null;
let cachedUser: User | null = null;

export function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedUser;
  cachedRaw = raw;
  if (!raw) {
    cachedUser = null;
    return null;
  }
  try {
    cachedUser = JSON.parse(raw) as User;
  } catch {
    cachedUser = null;
  }
  return cachedUser;
}

export function writeStoredUser(user: User): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function clearStoredUser(): void {
  window.localStorage.removeItem(STORAGE_KEY);
}
