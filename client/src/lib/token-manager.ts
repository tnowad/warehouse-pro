import axiosInstance from "./axios-instance";
import { useToken } from "@/hooks/use-token";

let refreshPromise: Promise<string> | null = null;

const getRefreshToken = async ({ refreshToken }: { refreshToken: string }) =>
  axiosInstance.post<{
    accessToken: string;
  }>("/auth/refresh", { refreshToken });

export async function refreshAccessToken() {
  const refreshToken = useToken.getState().refreshToken;
  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = getRefreshToken({ refreshToken })
    .then(({ data: { accessToken } }) => {
      useToken.getState().setToken(accessToken, refreshToken);
      return accessToken;
    })
    .catch((error) => {
      useToken.setState({ refreshToken: null });
      refreshPromise = null;
      throw error;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
