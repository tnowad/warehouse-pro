import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import {
  PostAuthRefreshRequestSchema,
  PostAuthRefreshResponseSchema,
} from "../schemas/post-auth-refresh-schema";

export async function postAuthRefresh(
  data: PostAuthRefreshRequestSchema,
  config?: AxiosRequestConfig<PostAuthRefreshRequestSchema>,
): Promise<PostAuthRefreshResponseSchema> {
  const response = await apiClient.post<
    PostAuthRefreshResponseSchema,
    PostAuthRefreshRequestSchema
  >("/auth/refresh", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}
