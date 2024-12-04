import {
  listReturnsApi,
  ListReturnsQuerySchema,
} from "@/lib/apis/list-returns.api";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export function createListReturnsQueryOptions(query: ListReturnsQuerySchema) {
  return queryOptions({
    queryKey: ["get-returns", query],
    queryFn: () => listReturnsApi(query),
    placeholderData: keepPreviousData,
  });
}
