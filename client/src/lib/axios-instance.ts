import { useToken } from "@/hooks/use-token";
import axios, { InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./token-manager";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

async function axiosRequestHandler(config: InternalAxiosRequestConfig) {
  const { accessToken } = useToken.getState();

  if (!accessToken) {
    await refreshAccessToken();
  }

  const updatedAccessToken = useToken.getState().accessToken;

  config.headers["Authorization"] = `Bearer ${updatedAccessToken}`;

  return config;
}

axiosInstance.interceptors.request.use(
  (config) => {
    return axiosRequestHandler(config);
  },
  (error) => Promise.reject(error),
  { runWhen: (config) => config.headers["No-Auth"] !== undefined },
);

export default axiosInstance;
