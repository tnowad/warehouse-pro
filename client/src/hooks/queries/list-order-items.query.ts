import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  listOrderItemsApi,
  ListOrderItemsQuerySchema,
} from "@/lib/apis/list-order-items.api";

export function createListOrderItemsQueryOptions(
  query: ListOrderItemsQuerySchema,
) {
  const queryKey = ["order-items", query];
  return queryOptions({
    queryKey,
    queryFn: () => listOrderItemsApi(query),
    throwOnError: (error) => isAxiosError(error),
  });
}
