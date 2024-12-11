import { z } from "zod";
import { procurementItemSchema } from "../schemas/procurement-item.schema";
import { apiClient } from "../api/client";

export const getProcurementItemsParamsSchema = z.object({
  procurementId: z.string().uuid(),
});
export type GetProcurementItemsParamsSchema = z.infer<
  typeof getProcurementItemsParamsSchema
>;
export const getProcurementItemsResponseSchema = z.object({
  items: z.array(procurementItemSchema),
  rowCount: z.number(),
  pageSize: z.number(),
  page: z.number(),
  pageCount: z.number(),
});
export type GetProcurementItemsResponseSchema = z.infer<
  typeof getProcurementItemsResponseSchema
>;
export const getProcurementItemsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetProcurementItemsErrorResponseSchema = z.infer<
  typeof getProcurementItemsErrorResponseSchema
>;

export async function getProcurementItemsApi(
  params: GetProcurementItemsParamsSchema,
) {
  const response = await apiClient.get<GetProcurementItemsResponseSchema>(
    `/procurements/${params.procurementId}/items`,
  );
  return response.data;
}
