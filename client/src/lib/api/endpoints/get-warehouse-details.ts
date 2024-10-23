import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";
import {
  GetWarehouseDetailsRequestSchema,
  GetWarehouseDetailsResponseSchema,
} from "../schemas/get-warehouse-details-schema";

export async function getWarehouseDetails(
  id: string,
  params?: GetWarehouseDetailsRequestSchema,
  config?: AxiosRequestConfig<GetWarehouseDetailsRequestSchema>,
) {
  const response = await apiClient.get<
    GetWarehouseDetailsResponseSchema,
    GetWarehouseDetailsRequestSchema
  >(`/warehouses/${id}`, params, {
    ...config,
  });
  return response.data;
}
