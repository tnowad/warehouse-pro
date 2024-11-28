import { z } from "zod";
import { orderItemSchema } from "../schemas/order-item.schema";
import { apiClient } from "../api/client";

export const getOrderItemsParamsSchema = z.object({
  orderId: z.string().uuid(),
});
export type GetOrderItemsParamsSchema = z.infer<
  typeof getOrderItemsParamsSchema
>;
export const getOrderItemsResponseSchema = z.object({
  items: z.array(orderItemSchema),
  rowCount: z.number(),
  pageSize: z.number(),
  page: z.number(),
  pageCount: z.number(),
});
export type GetOrderItemsResponseSchema = z.infer<
  typeof getOrderItemsResponseSchema
>;
export const getOrderItemsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetOrderItemsErrorResponseSchema = z.infer<
  typeof getOrderItemsErrorResponseSchema
>;

export async function getOrderItemsApi(params: GetOrderItemsParamsSchema) {
  const response = await apiClient.get<GetOrderItemsResponseSchema>(
    `/orders/${params.orderId}/order-items`,
  );
  return response.data;
}
