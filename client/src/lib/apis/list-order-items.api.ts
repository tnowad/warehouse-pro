import { z } from "zod";
import { orderItemSchema } from "../schemas/order-item.schema";
import { apiClient } from "../api/client";

export const listOrderItemsQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  productId: z.string().uuid().optional(),
  quantity: z.number().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export const listOrderItemsQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listOrderItemsQueryFilterSchema);
export type ListOrderItemsQuerySchema = z.infer<
  typeof listOrderItemsQuerySchema
>;

export const listOrderItemsResponseSchema = z.object({
  items: z.array(orderItemSchema),
  rowCount: z.number(),
});
export type ListOrderItemsResponseSchema = z.infer<
  typeof listOrderItemsResponseSchema
>;

export const listOrderItemsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListOrderItemsErrorResponseSchema = z.infer<
  typeof listOrderItemsErrorResponseSchema
>;

export async function listOrderItemsApi(
  query: ListOrderItemsQuerySchema,
): Promise<ListOrderItemsResponseSchema> {
  const response = await apiClient.get<ListOrderItemsResponseSchema>(
    `/order-items`,
    { params: query },
  );
  return response.data;
}
