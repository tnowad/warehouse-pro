import {
  listWarehouseRolesApi,
  ListWarehouseRolesErrorResponseSchema,
  ListWarehouseRolesParamsSchema,
  ListWarehouseRolesQuerySchema,
  ListWarehouseRolesResponseSchema,
} from "@/lib/apis/list-warehouse-roles.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListWarehouseRolesQueryOptions(
  params: ListWarehouseRolesParamsSchema,
  query: ListWarehouseRolesQuerySchema,
) {
  const queryKey = ["get-warehouse-roles", params, query] as const;
  return queryOptions<
    ListWarehouseRolesResponseSchema,
    ListWarehouseRolesErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listWarehouseRolesApi(params, query),
    placeholderData: keepPreviousData,
  });
}
