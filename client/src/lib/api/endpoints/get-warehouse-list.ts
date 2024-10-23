import { AxiosRequestConfig } from "axios";
import {
  GetWarehouseListQueryParams,
  GetWarehouseListResponse,
} from "../schemas/get-warehouse-list-schema";
import { apiClient } from "../client";

export async function getWarehouseList(
  params?: GetWarehouseListQueryParams,
  config?: AxiosRequestConfig<GetWarehouseListQueryParams>,
): Promise<GetWarehouseListResponse> {
  const response = await apiClient.get<
    GetWarehouseListResponse,
    GetWarehouseListQueryParams
  >("/warehouses", params, {
    ...config,
  });
  return response.data;
}
