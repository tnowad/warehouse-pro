import { create } from "zustand";

type TokenStore = {
  accessToken: string | null;
  refreshToken: string | null;

  setToken: (accessToken: string, refreshToken: string) => void;
  clearToken: () => void;
};

export const useToken = create<TokenStore>((set) => ({
  accessToken: null,
  refreshToken: localStorage.getItem("refreshToken") ?? null,

  setToken: (accessToken, refreshToken) => {
    set({ accessToken, refreshToken });
    localStorage.setItem("refreshToken", refreshToken);
  },

  clearToken: () => {
    set({ accessToken: null, refreshToken: null });
    localStorage.removeItem("refreshToken");
  },
}));
