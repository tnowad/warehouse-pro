import {
  listShipmentsApi,
  ListShipmentsQuerySchema,
} from "@/lib/apis/list-shipments.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListShipmentsQueryOptions(
  query: ListShipmentsQuerySchema,
) {
  return queryOptions({
    queryKey: ["get-shipments", query],
    queryFn: () => listShipmentsApi(query),
    placeholderData: keepPreviousData,
  });
}
