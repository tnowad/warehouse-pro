import { z } from "zod";
import { procurementSchema } from "../schemas/procurement.schema";
import { apiClient } from "../api/client";

export const listProcurementsQueryFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  supplierIds: z.array(z.string().uuid()).optional(),
  status: z.string().optional(),
  orderDateFrom: z.string().optional(),
  orderDateTo: z.string().optional(),
  deliveryDateFrom: z.string().optional(),
  deliveryDateTo: z.string().optional(),
});

export type ListProcurementsQueryFilterSchema = z.infer<
  typeof listProcurementsQueryFilterSchema
>;

export const listProcurementsQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listProcurementsQueryFilterSchema);

export type ListProcurementsQuerySchema = z.infer<
  typeof listProcurementsQuerySchema
>;

export const listProcurementsResponseSchema = z.object({
  items: z.array(procurementSchema),
  rowCount: z.number(),
});

export type ListProcurementsResponseSchema = z.infer<
  typeof listProcurementsResponseSchema
>;

export const listProcurementsErrorResponseSchema = z.object({
  message: z.string(),
});

export type ListProcurementsErrorResponseSchema = z.infer<
  typeof listProcurementsErrorResponseSchema
>;

export async function listProcurementsApi(
  query: ListProcurementsQuerySchema,
): Promise<ListProcurementsResponseSchema> {
  const response = await apiClient.get<ListProcurementsResponseSchema>(
    "/procurements",
    query,
  );
  return response.data;
}
