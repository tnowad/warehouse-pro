import {
  getProcurementDetailsApi,
  GetProcurementDetailsErrorResponseSchema,
  GetProcurementDetailsParamsSchema,
  GetProcurementDetailsResponseSchema,
} from "@/lib/apis/get-procurement-details.api";
import { queryOptions } from "@tanstack/react-query";

export function createGetProcurementDetailsQueryOptions(
  params: GetProcurementDetailsParamsSchema,
) {
  const queryKey = ["get-procurement-details", params] as const;
  return queryOptions<
    GetProcurementDetailsResponseSchema,
    GetProcurementDetailsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getProcurementDetailsApi(params),
  });
}
