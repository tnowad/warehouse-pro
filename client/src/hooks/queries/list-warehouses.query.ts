import {
  listWarehousesApi,
  ListWarehousesErrorResponseSchema,
  ListWarehousesQuerySchema,
  ListWarehousesResponseSchema,
} from "@/lib/apis/list-warehouses.api";
import {
  InfiniteData,
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

export function createListWarehousesQueryOptions(
  query: ListWarehousesQuerySchema,
) {
  const queryKey = ["list-warehouses", query] as const;
  return queryOptions<
    ListWarehousesResponseSchema,
    ListWarehousesErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listWarehousesApi(query),
    placeholderData: keepPreviousData,
  });
}

export function createListWarehousesInfinityQueryOptions(
  query: ListWarehousesQuerySchema,
) {
  const queryKey = ["list-warehouses"] as const;
  return infiniteQueryOptions<
    ListWarehousesResponseSchema,
    ListWarehousesErrorResponseSchema,
    InfiniteData<ListWarehousesResponseSchema>,
    typeof queryKey,
    ListWarehousesQuerySchema
  >({
    queryKey,
    queryFn: ({ pageParam }) => listWarehousesApi(pageParam),
    getNextPageParam: (lastPage) => ({}),
    getPreviousPageParam: (firstPage) => ({}),
    initialPageParam: query,

    placeholderData: keepPreviousData,
  });
}
