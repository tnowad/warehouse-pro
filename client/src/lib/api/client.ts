import { useTokenStore } from "@/hooks/use-token";
import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
import { refreshAccessToken } from "../token-manager";
import {
  PostAuthRefreshErrorResponseSchema,
  PostAuthRefreshRequestSchema,
} from "./schemas/post-auth-refresh-schema";
import { jwtDecode } from "jwt-decode";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const apiClient = {
  post: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    return client.post<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    );
  },

  get: <TResponse = unknown, TQueryParams = unknown>(
    url: string,
    params?: TQueryParams,
    config?: AxiosRequestConfig<TQueryParams>,
  ): Promise<AxiosResponse<TResponse, TQueryParams>> => {
    return client.get<TResponse, AxiosResponse<TResponse, TQueryParams>>(url, {
      params,
      ...config,
    });
  },
};

client.interceptors.request.use(
  async (config) => {
    const accessToken = useTokenStore.getState().accessToken;
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      if (decoded.exp && decoded.exp * 1000 > Date.now()) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
        return config;
      }
    }

    try {
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      }
    } catch (error) {
      if (
        isAxiosError<
          PostAuthRefreshErrorResponseSchema,
          PostAuthRefreshRequestSchema
        >(error)
      ) {
        switch (error.response?.data.type) {
          case "Unauthorized":
          case "ValidationError":
            useTokenStore.getState().actions.clearTokens();
            break;
          default:
            throw {
              type: "NetworkError",
              message: "Failed to connect to the server",
            };
        }
      }
    }

    return config;
  },
  null,
  {
    runWhen: (request) => !!!request.headers["No-Auth"],
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (isAxiosError(error)) {
      if (error.code === "ERR_NETWORK") {
        throw {
          type: "NetworkError",
          message: "Failed to connect to the server",
        };
      }
      throw error.response?.data;
    }
    throw {
      type: "UnknownError",
      message: "An unknown error occurred",
    };
  },
);

export default client;
