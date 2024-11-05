import { z } from "zod";
import { orderSchema } from "../schemas/order.schema";
import { apiClient } from "../api/client";

export const listOrdersQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export const listOrdersQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listOrdersQueryFilterSchema);
export type ListOrdersQuerySchema = z.infer<typeof listOrdersQuerySchema>;

export const listOrdersResponseSchema = z.object({
  items: z.array(orderSchema),
  rowCount: z.number(),
});
export type ListOrdersResponseSchema = z.infer<typeof listOrdersResponseSchema>;

export const listOrdersErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListOrdersErrorResponseSchema = z.infer<
  typeof listOrdersErrorResponseSchema
>;

export async function listOrdersApi(
  query: ListOrdersQuerySchema,
): Promise<ListOrdersResponseSchema> {
  const response = await apiClient.get<ListOrdersResponseSchema>(
    `/orders`,
    query,
  );
  return response.data;
}
