import { z } from "zod";
import { apiClient } from "../api/client";

export const getSummaryReportResponseSchema = z.object({
  totalOrders: z.number(),
  totalInventory: z.number(),
  percentageOfShippedOrders: z.number(),
  unshippedOrders: z.number(),
});
export type GetSummaryReportResponseSchema = z.infer<
  typeof getSummaryReportResponseSchema
>;
export const getSummaryReportErrorResponseSchema = z.object({
  message: z.string(),
});

export type GetSummaryReportErrorResponseSchema = z.infer<
  typeof getSummaryReportErrorResponseSchema
>;

export async function getSummaryReportApi(): Promise<GetSummaryReportResponseSchema> {
  const response =
    await apiClient.get<GetSummaryReportResponseSchema>("/reports/summary");
  return response.data;
}
