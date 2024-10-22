import { useCurrentUserStore } from "@/providers/current-user-store-provider";

export const useCurrentUser = () => useCurrentUserStore((state) => state.user);
export const useCurrentUserActions = () =>
  useCurrentUserStore((state) => state.actions);
