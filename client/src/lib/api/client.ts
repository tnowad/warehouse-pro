import axios, { AxiosRequestConfig, AxiosResponse, isAxiosError } from "axios";
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

  put: <TResponse = unknown, RRequest = unknown>(
    url: string,
    data: RRequest,
    config?: AxiosRequestConfig<RRequest>,
  ): Promise<AxiosResponse<TResponse, RRequest>> => {
    return client.put<TResponse, AxiosResponse<TResponse>, RRequest>(
      url,
      data,
      config,
    );
  },
};

client.interceptors.request.use(
  async (config) => {
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
