import { AxiosRequestConfig } from "axios";
import {
  PostWarehouseDetailsUpdateRequestSchema,
  PostWarehouseDetailsUpdateResponseSchema,
} from "../schemas/post-warehouse-details-update-schema";
import { apiClient } from "../client";

export async function postWarehouseDetailsUpdate(
  id: string,
  data: PostWarehouseDetailsUpdateRequestSchema,
  config?: AxiosRequestConfig<PostWarehouseDetailsUpdateRequestSchema>,
) {
  const response = await apiClient.put<
    PostWarehouseDetailsUpdateResponseSchema,
    PostWarehouseDetailsUpdateRequestSchema
  >(`/warehouses/${id}`, data, {
    ...config,
  });
  return response.data;
}
