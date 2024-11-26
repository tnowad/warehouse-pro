import {
  listInventoriesApi,
  ListInventoriesQuerySchema,
} from "@/lib/apis/list-inventories.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListInventoriesQueryOptions(
  query: ListInventoriesQuerySchema,
) {
  return queryOptions({
    queryKey: ["get-inventories", query],
    queryFn: () => listInventoriesApi(query),
    placeholderData: keepPreviousData,
  });
}
