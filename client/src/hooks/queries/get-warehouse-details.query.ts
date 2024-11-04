import {
  getWarehouseDetailsApi,
  GetWarehouseDetailsErrorResponseSchema,
  GetWarehouseDetailsParamsSchema,
  GetWarehouseDetailsResponseSchema,
} from "@/lib/apis/get-warehouse-details.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createGetWarehouseDetailsOptions(
  params: GetWarehouseDetailsParamsSchema,
) {
  const queryKey = ["getWarehouseDetails", params] as const;
  return queryOptions<
    GetWarehouseDetailsResponseSchema,
    GetWarehouseDetailsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getWarehouseDetailsApi(params),
    placeholderData: keepPreviousData,
  });
}
