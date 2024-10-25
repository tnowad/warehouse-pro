import { create } from "zustand";
import Cookies from "js-cookie";

type TokenStore = {
  actions: {
    setAccessToken: (accessToken: string) => void;
    setRefreshToken: (refreshToken: string) => void;
    getAccessToken: () => string | undefined;
    getRefreshToken: () => string | undefined;
    clearTokens: () => void;
  };
};

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

export const useTokenStore = create<TokenStore>(
  (): TokenStore => ({
    actions: {
      setAccessToken: (token) =>
        Cookies.set(ACCESS_TOKEN_KEY, token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        }),
      setRefreshToken: (token) =>
        Cookies.set(REFRESH_TOKEN_KEY, token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        }),
      getAccessToken: () => Cookies.get(ACCESS_TOKEN_KEY),
      getRefreshToken: () => Cookies.get(REFRESH_TOKEN_KEY),
      clearTokens: () => {
        Cookies.remove(ACCESS_TOKEN_KEY, { path: "/" });
        Cookies.remove(REFRESH_TOKEN_KEY, { path: "/" });
      },
    },
  }),
);

export const useAccessToken = () =>
  useTokenStore((state) => state.actions.getAccessToken());
export const useRefreshToken = () =>
  useTokenStore((state) => state.actions.getRefreshToken());
export const useTokenActions = () => useTokenStore((state) => state.actions);
