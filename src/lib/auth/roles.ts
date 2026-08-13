import type { Role } from "@/types/models";

export const ROUTE_ROLES: Record<string, Role> = {
  "/sender": "SENDER",
  "/driver": "DRIVER",
  "/pickup": "PICKUP",
  "/admin": "ADMIN",
};

export function roleForPath(pathname: string): Role | undefined {
  const segment = "/" + pathname.split("/").filter(Boolean)[0];
  return ROUTE_ROLES[segment];
}

export function homeForRole(role: Role): string {
  return {
    SENDER: "/sender",
    DRIVER: "/driver",
    PICKUP: "/pickup",
    ADMIN: "/admin",
  }[role];
}
