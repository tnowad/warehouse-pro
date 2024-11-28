import { z } from "zod";
import { orderSchema } from "../schemas/order.schema";
import { apiClient } from "../api/client";

export const getOrderDetailsParamsSchema = z.object({
  orderId: z.string(),
});
export type GetOrderDetailsParamsSchema = z.infer<
  typeof getOrderDetailsParamsSchema
>;

export const getOrderDetailsResponseSchema = orderSchema;

export type GetOrderDetailsResponseSchema = z.infer<
  typeof getOrderDetailsResponseSchema
>;

export const getOrderDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetOrderDetailsErrorResponseSchema = z.infer<
  typeof getOrderDetailsErrorResponseSchema
>;

export async function getOrderDetailsApi(params: GetOrderDetailsParamsSchema) {
  const response = await apiClient.get<GetOrderDetailsResponseSchema>(
    `/orders/${params.orderId}`,
  );
  return response.data;
}
