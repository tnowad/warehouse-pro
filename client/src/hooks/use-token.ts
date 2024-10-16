import { create } from "zustand";
import Cookies from "js-cookie";

type TokenStore = {
  accessToken: string | null;
  actions: {
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    getRefreshToken: () => string | undefined;
    clearTokens: () => void;
  };
};

const REFRESH_TOKEN_KEY = "refresh_token";

export const useTokenStore = create<TokenStore>(
  (set): TokenStore => ({
    accessToken: null,
    actions: {
      setAccessToken: (accessToken) => set({ accessToken }),
      setRefreshToken: (token) =>
        Cookies.set(REFRESH_TOKEN_KEY, token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        }),
      getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),
      clearTokens: () => {
        Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
        set({ accessToken: null });
      },
    },
  }),
);

export const useAccessToken = () => useTokenStore((state) => state.accessToken);
export const useRefreshToken = () =>
  useTokenStore((state) => state.actions.getRefreshToken());
export const useTokenActions = () => useTokenStore((state) => state.actions);
