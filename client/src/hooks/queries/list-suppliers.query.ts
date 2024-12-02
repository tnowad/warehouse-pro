import {
  listSuppliersApi,
  ListSuppliersErrorResponseSchema,
  ListSuppliersQuerySchema,
  ListSuppliersResponseSchema,
} from "@/lib/apis/list-suppliers.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListSuppliersQueryOptions(
  query: ListSuppliersQuerySchema,
) {
  const queryKey = ["get-suppliers", query] as const;
  return queryOptions<
    ListSuppliersResponseSchema,
    ListSuppliersErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listSuppliersApi(query),
    placeholderData: keepPreviousData,
  });
}
