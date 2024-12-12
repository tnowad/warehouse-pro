import { z } from "zod";
import { apiClient } from "../api/client";

export const getSalesReportParamsSchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
});
export type GetSalesReportParamsSchema = z.infer<
  typeof getSalesReportParamsSchema
>;

export const getSalesReportResponseSchema = z.object({
  items: z.array(
    z.object({
      date: z.string(),
      totalSales: z.number(),
    }),
  ),
});

export type GetSalesReportResponseSchema = z.infer<
  typeof getSalesReportResponseSchema
>;

export const getSalesReportErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetSalesReportErrorResponseSchema = z.infer<
  typeof getSalesReportErrorResponseSchema
>;

export async function getSalesReportApi(params: GetSalesReportParamsSchema) {
  const response = await apiClient.get<GetSalesReportResponseSchema>(
    `/reports/sales`,
    params,
  );
  return response.data;
}
