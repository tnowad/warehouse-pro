import {
  getInventoryDetailsApi,
  GetInventoryDetailsParamsSchema,
} from "@/lib/apis/get-inventory-details.api";
import { queryOptions } from "@tanstack/react-query";

export function createGetInventoryDetailsQueryOptions(
  params: GetInventoryDetailsParamsSchema,
) {
  const queryKey = ["get-inventory-details", params] as const;
  return queryOptions({
    queryKey,
    queryFn: () => getInventoryDetailsApi(params),
  });
}
