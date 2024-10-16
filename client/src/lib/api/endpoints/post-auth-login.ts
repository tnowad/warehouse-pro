import { apiClient } from "../client";
import { AxiosRequestConfig } from "axios";
import {
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from "../schemas/post-auth-login-schema";

export async function postAuthLogin(
  data: PostAuthLoginRequestSchema,
  config?: AxiosRequestConfig<PostAuthLoginRequestSchema>,
): Promise<PostAuthLoginResponseSchema> {
  const response = await apiClient.post<
    PostAuthLoginResponseSchema,
    PostAuthLoginRequestSchema
  >("/auth/login", data, {
    headers: {
      "No-Auth": true,
    },
    ...config,
  });
  return response.data;
}
