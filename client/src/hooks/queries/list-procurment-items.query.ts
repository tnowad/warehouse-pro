import { queryOptions } from "@tanstack/react-query";
import {
  GetProcurementItemsParamsSchema,
  getProcurementItemsApi,
  GetProcurementItemsErrorResponseSchema,
  GetProcurementItemsResponseSchema,
} from "../../lib/apis/list-procurment-items.api";

export function createListProcurementItemsQueryOptions(
  params: GetProcurementItemsParamsSchema,
) {
  const queryKey = ["list-procurement-items", params] as const;
  return queryOptions<
    GetProcurementItemsResponseSchema,
    GetProcurementItemsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getProcurementItemsApi(params),
  });
}
