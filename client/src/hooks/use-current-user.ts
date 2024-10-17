import { UserResponseSchema } from "@/lib/api/schemas/user-response-schema";
import { create } from "zustand";

type CurrentUserProfileStore = {
  currentUser: UserResponseSchema | null;
  actions: {
    setCurrentUser: (user: UserResponseSchema) => void;
  };
};

export const useCurrentUserProfileStore = create<CurrentUserProfileStore>(
  (set) => ({
    currentUser: null,
    actions: {
      setCurrentUser: (user) => set({ currentUser: user }),
    },
  }),
);

export const useCurrentUser = () =>
  useCurrentUserProfileStore((state) => state.currentUser);
export const useCurrentUserActions = () =>
  useCurrentUserProfileStore((state) => state.actions);
