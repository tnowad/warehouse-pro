import {
  listWarehousesApi,
  ListWarehousesErrorResponseSchema,
  ListWarehousesQuerySchema,
  ListWarehousesResponseSchema,
} from "@/lib/apis/list-warehouses.api";
import { InfiniteData, infiniteQueryOptions } from "@tanstack/react-query";

export function createListWarehousesInfinityQueryOptions(
  query: ListWarehousesQuerySchema,
) {
  const queryKey = ["list-warehouses", query.limit] as const;
  return infiniteQueryOptions<
    ListWarehousesResponseSchema,
    ListWarehousesErrorResponseSchema,
    InfiniteData<ListWarehousesResponseSchema>,
    typeof queryKey,
    ListWarehousesQuerySchema
  >({
    queryKey: ["list-warehouses", query.limit],
    queryFn: ({ pageParam }) => listWarehousesApi(pageParam),
    getNextPageParam: (lastPage) => ({
      limit: lastPage.limit,
      cursor: lastPage.nextCursor,
    }),
    getPreviousPageParam: (firstPage) => ({
      limit: firstPage.limit,
      cursor: firstPage.prevCursor,
    }),
    initialPageParam: query,
  });
}
