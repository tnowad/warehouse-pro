import {
  getSalesReportApi,
  GetSalesReportErrorResponseSchema,
  GetSalesReportParamsSchema,
  GetSalesReportResponseSchema,
} from "@/lib/apis/get-sales-report.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createGetSalesReportQueryOptions(
  query: GetSalesReportParamsSchema,
) {
  const queryKey = ["get-sales-report", query] as const;
  return queryOptions<
    GetSalesReportResponseSchema,
    GetSalesReportErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getSalesReportApi(query),
    placeholderData: keepPreviousData,
  });
}
