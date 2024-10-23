import { useTokenStore } from "@/hooks/use-token";
import { postAuthRefresh } from "./api/endpoints/post-auth-refresh";
import { isAxiosError } from "axios";

let refreshPromise: Promise<string> | null = null;

export async function refreshAccessToken() {
  const refreshToken = useTokenStore.getState().actions.getRefreshToken();

  if (!refreshToken) {
    throw new Error("No refresh token found");
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  refreshPromise = (async () => {
    try {
      const data = await postAuthRefresh({ refreshToken });
      useTokenStore.getState().actions.setAccessToken(data.accessToken);
      refreshPromise = null;
      return data.accessToken;
    } catch (error) {
      refreshPromise = null;
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error("Failed to refresh access token");
    }
  })();

  return refreshPromise;
}
