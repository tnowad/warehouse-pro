import {
  listWarehousePermissionsApi,
  ListWarehousePermissionsErrorResponseSchema,
  ListWarehousePermissionsParamsSchema,
  ListWarehousePermissionsResponseSchema,
} from "@/lib/apis/list-warehouse-permissions.api";
import { queryOptions } from "@tanstack/react-query";

export function createListWarehousePermissionsQueryOptions(
  params: ListWarehousePermissionsParamsSchema,
) {
  const queryKey = ["list-warehouse-permissions", params] as const;
  return queryOptions<
    ListWarehousePermissionsResponseSchema,
    ListWarehousePermissionsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listWarehousePermissionsApi(params),
  });
}
