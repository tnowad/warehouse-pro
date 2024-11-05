import {
  listPermissionsApi,
  ListPermissionsErrorResponseSchema,
  ListPermissionsQuerySchema,
  ListPermissionsResponseSchema,
} from "@/lib/apis/list-permissions.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListPermissionsQueryOptions(
  query: ListPermissionsQuerySchema,
) {
  const queryKey = ["get-permissions", query] as const;
  return queryOptions<
    ListPermissionsResponseSchema,
    ListPermissionsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listPermissionsApi(query),
    placeholderData: keepPreviousData,
  });
}
