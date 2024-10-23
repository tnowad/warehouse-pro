import { useCurrentUserStore } from "@/providers/current-user-store-provider";
import { useGetCurrentUserQuery } from "./apis/auth";

export const useCurrentUser = () => {
  const currentUserQuery = useGetCurrentUserQuery();

  return {
    currentUser: currentUserQuery.data,
    isLoading: currentUserQuery.isLoading,
    error: currentUserQuery.error,
  };
};

export const useCurrentUserActions = () =>
  useCurrentUserStore((state) => state.actions);
