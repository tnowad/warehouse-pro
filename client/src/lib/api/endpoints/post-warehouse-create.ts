import { AxiosRequestConfig } from "axios";
import { CreateWarehouseRequest } from "../schemas/create-warehouse-request-schema";
import { apiClient } from "../client";
import {
  PostWarehouseCreateRequestSchema,
  PostWarehouseCreateResponseSchema,
} from "../schemas/post-auth-warehouse-create-schema";

export async function postWarehouseCreate(
  data: PostWarehouseCreateRequestSchema,
  config?: AxiosRequestConfig<CreateWarehouseRequest>,
) {
  const response = await apiClient.post<
    PostWarehouseCreateResponseSchema,
    PostWarehouseCreateRequestSchema
  >("/warehouses", data, {
    ...config,
  });
  return response.data;
}
