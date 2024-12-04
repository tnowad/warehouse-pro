import { z } from "zod";
import { returnSchema } from "../schemas/return.schema";
import { apiClient } from "../api/client";

export const listReturnsQueryFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  orderItemIds: z.array(z.string().uuid()).optional(),
  status: z.string().optional(),
  returnDateFrom: z.string().optional(),
  returnDateTo: z.string().optional(),
});

export type ListReturnsQueryFilterSchema = z.infer<
  typeof listReturnsQueryFilterSchema
>;

export const listReturnsQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listReturnsQueryFilterSchema);

export type ListReturnsQuerySchema = z.infer<typeof listReturnsQuerySchema>;

export const listReturnsResponseSchema = z.object({
  items: z.array(returnSchema),
  rowCount: z.number(),
});
export type ListReturnsResponseSchema = z.infer<
  typeof listReturnsResponseSchema
>;

export const listReturnsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListReturnsErrorResponseSchema = z.infer<
  typeof listReturnsErrorResponseSchema
>;

export async function listReturnsApi(
  query: ListReturnsQuerySchema,
): Promise<ListReturnsResponseSchema> {
  const response = await apiClient.get<ListReturnsResponseSchema>(
    "/returns",
    query,
  );
  return response.data;
}
