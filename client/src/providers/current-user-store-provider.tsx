"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import type { CurrentUserStore } from "@/stores/current-user-store";
import {
  createCurrentUserStore,
  initialCurrentUserStore,
} from "@/stores/current-user-store";

export type CurrentUserStoreApi = ReturnType<typeof createCurrentUserStore>;

export const CurrentUserStoreContext =
  createContext<CurrentUserStoreApi | null>(null);

export type CurrentUserStoreProviderProps = {
  children: ReactNode;
};

export function CurrentUserStoreProvider({
  children,
}: CurrentUserStoreProviderProps) {
  const storeRef = useRef<CurrentUserStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createCurrentUserStore(initialCurrentUserStore());
  }

  return (
    <CurrentUserStoreContext.Provider value={storeRef.current}>
      {children}
    </CurrentUserStoreContext.Provider>
  );
}

export function useCurrentUserStore<T>(
  selector: (store: CurrentUserStore) => T,
) {
  const store = useContext(CurrentUserStoreContext);
  if (!store) {
    throw new Error(
      "useCurrentUserStore must be used within a CurrentUserStoreProvider",
    );
  }
  return useStore(store, selector);
}
