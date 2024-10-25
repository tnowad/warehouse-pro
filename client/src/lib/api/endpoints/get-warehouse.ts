import { AxiosRequestConfig } from "axios";
import { apiClient } from "../client";

export function getWarehouse(
  params?: GetWarehouseRequestSchema,
  config?: AxiosRequestConfig<GetWarehouseRequestSchema>,
) {
  return apiClient.get<GetWarehouseResponseSchema, GetWarehouseRequestSchema>(
    "/warehouses",
    params,
    {
      ...config,
    },
  );
}
