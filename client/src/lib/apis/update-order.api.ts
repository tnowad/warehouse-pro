import { z } from "zod";
import { apiClient } from "../api/client";
import { orderSchema } from "../schemas/order.schema";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { orderItemSchema } from "../schemas/order-item.schema";

export const updateOrderParamsSchema = z.object({
  orderId: z.string(),
});
export type UpdateOrderParamsSchema = z.infer<typeof updateOrderParamsSchema>;

export const updateOrderBodySchema = orderSchema
  .pick({
    status: true,
    paymentStatus: true,
    shippingAddress: true,
  })
  .extend({
    items: z
      .array(
        z.discriminatedUnion("type", [
          orderItemSchema
            .omit({
              orderId: true,
              totalPrice: true,
            })
            .extend({
              type: z.enum(["UPDATE", "DELETE"]),
            }),
          orderItemSchema
            .omit({
              id: true,
              orderId: true,
              totalPrice: true,
            })
            .extend({
              type: z.literal("CREATE"),
            }),
        ]),
      )
      .min(1),
  });

export type UpdateOrderBodySchema = z.infer<typeof updateOrderBodySchema>;

export const updateOrderResponseSchema = orderSchema;
export type UpdateOrderResponseSchema = z.infer<
  typeof updateOrderResponseSchema
>;

export const updateOrderErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);

export type UpdateOrderErrorResponseSchema = z.infer<
  typeof updateOrderErrorResponseSchema
>;

export async function updateOrderApi(
  params: UpdateOrderParamsSchema,
  body: UpdateOrderBodySchema,
) {
  const response = await apiClient.put<UpdateOrderResponseSchema>(
    `/orders/${params.orderId}`,
    body,
  );
  return response.data;
}
