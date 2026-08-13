"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string) {
  return (onStoreChange: () => void) => {
    const mediaQuery = window.matchMedia(query);
    mediaQuery.addEventListener("change", onStoreChange);
    return () => mediaQuery.removeEventListener("change", onStoreChange);
  };
}

function getServerSnapshot() {
  return false;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribe(query),
    () => window.matchMedia(query).matches,
    getServerSnapshot
  );
}

export function useIsCoarsePointer(): boolean {
  return useMediaQuery("(pointer: coarse)");
}

export function useIsMobile(): boolean {
  return useMediaQuery("(max-width: 767px)");
}
