import {
  getSummaryReportApi,
  GetSummaryReportErrorResponseSchema,
  GetSummaryReportResponseSchema,
} from "@/lib/apis/get-summary-report.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createGetSummaryReportQueryOptions() {
  const queryKey = ["get-summary-report"] as const;
  return queryOptions<
    GetSummaryReportResponseSchema,
    GetSummaryReportErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getSummaryReportApi(),
    placeholderData: keepPreviousData,
  });
}
