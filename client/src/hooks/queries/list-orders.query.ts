import {
  listOrdersApi,
  ListOrdersErrorResponseSchema,
  ListOrdersQuerySchema,
  ListOrdersResponseSchema,
} from "@/lib/apis/list-orders.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListOrdersQueryOptions(query: ListOrdersQuerySchema) {
  const queryKey = ["get-orders", query] as const;
  return queryOptions<ListOrdersResponseSchema, ListOrdersErrorResponseSchema>({
    queryKey,
    queryFn: () => listOrdersApi(query),
    placeholderData: keepPreviousData,
  });
}
