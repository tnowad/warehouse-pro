import {
  listRolesApi,
  ListRolesErrorResponseSchema,
  ListRolesResponseSchema,
} from "@/lib/apis/list-roles.api";
import { ListWarehouseRolesQuerySchema } from "@/lib/apis/list-warehouse-roles.api";
import {
  InfiniteData,
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

export function createListRolesQueryOptions(
  query: ListWarehouseRolesQuerySchema,
) {
  const queryKey = ["get-roles", query] as const;
  return queryOptions<ListRolesResponseSchema, ListRolesErrorResponseSchema>({
    queryKey,
    queryFn: () => listRolesApi(query),
    placeholderData: keepPreviousData,
  });
}

export function createListRolesInfiniteQueryOptions(
  query: ListWarehouseRolesQuerySchema,
) {
  const queryKey = ["get-roles", query] as const;
  return infiniteQueryOptions<
    ListRolesResponseSchema,
    ListRolesErrorResponseSchema,
    InfiniteData<ListRolesResponseSchema>,
    typeof queryKey,
    number | undefined
  >({
    queryKey,
    queryFn: ({ pageParam }) => listRolesApi({ ...query, page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.pageCount > lastPage.page ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });
}
