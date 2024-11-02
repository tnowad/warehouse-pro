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
} from "@tanstack/react-query";

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
