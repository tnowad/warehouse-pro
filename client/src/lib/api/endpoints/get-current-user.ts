import { apiClient } from "@/lib/api/client";
import {
  GetCurrentUserRequestSchema,
  GetCurrentUserResponseSchema,
} from "../schemas/get-current-user-schema";
import { AxiosRequestConfig } from "axios";
export async function getCurrentUser(
  params?: GetCurrentUserRequestSchema,
  config?: AxiosRequestConfig<GetCurrentUserRequestSchema>,
) {
  const response = await apiClient.get<
    GetCurrentUserResponseSchema,
    GetCurrentUserRequestSchema
  >("/auth/current-user", params, {
    ...config,
  });

  return response.data;
}
