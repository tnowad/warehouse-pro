import { UserResponseSchema } from "@/lib/api/schemas/user-response-schema";
import { createStore } from "zustand/vanilla";

export type CurrentUserState = {
  user: UserResponseSchema | null;
};

export type CurrentUserActions = {
  actions: {
    setCurrentUser: (user: UserResponseSchema) => void;
  };
};

export type CurrentUserStore = CurrentUserState & CurrentUserActions;

export function initialCurrentUserStore(): CurrentUserState {
  return {
    user: null,
  };
}

export const defaultCurrentUserState: CurrentUserState = {
  user: null,
};

export function createCurrentUserStore(
  initialState: CurrentUserState = defaultCurrentUserState,
) {
  return createStore<CurrentUserStore>()((set) => ({
    ...initialState,
    actions: {
      setCurrentUser: (user) => set({ user }),
    },
  }));
}
