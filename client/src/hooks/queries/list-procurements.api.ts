import {
  listProcurementsApi,
  ListProcurementsQuerySchema,
} from "@/lib/apis/list-procurements.api";
import { queryOptions, keepPreviousData } from "@tanstack/react-query";

export function createListProcurementsQueryOptions(
  query: ListProcurementsQuerySchema,
) {
  return queryOptions({
    queryKey: ["get-procurements", query],
    queryFn: () => listProcurementsApi(query),
    placeholderData: keepPreviousData,
  });
}
