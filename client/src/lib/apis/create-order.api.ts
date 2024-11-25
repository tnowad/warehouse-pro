import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { orderItemSchema } from "../schemas/order-item.schema";
import { orderSchema } from "../schemas/order.schema";

export const createOrderBodySchema = orderSchema
  .pick({
    status: true,
    paymentStatus: true,
    shippingAddress: true,
  })
  .extend({
    items: z
      .array(
        orderItemSchema.pick({
          inventoryId: true,
          price: true,
          discount: true,
          productId: true,
          quantity: true,
        }),
      )
      .min(1),
  });

export type CreateOrderBodySchema = z.infer<typeof createOrderBodySchema>;

export const createOrderResponseSchema = orderSchema;

export type CreateOrderResponseSchema = z.infer<
  typeof createOrderResponseSchema
>;

export const createOrderErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type CreateOrderErrorResponseSchema = z.infer<
  typeof createOrderErrorResponseSchema
>;

export async function createOrderApi(body: CreateOrderBodySchema) {
  const response = await apiClient.post<CreateOrderResponseSchema>(
    "/orders",
    body,
  );
  return response.data;
}
