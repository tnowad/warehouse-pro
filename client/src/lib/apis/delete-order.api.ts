import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteOrderParamsSchema = z.object({
  orderId: z.string().uuid(),
});
export type DeleteOrderParamsSchema = z.infer<typeof deleteOrderParamsSchema>;

export const deleteOrderResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteOrderResponseSchema = z.infer<
  typeof deleteOrderResponseSchema
>;

export const deleteOrderErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteOrderErrorResponseSchema = z.infer<
  typeof deleteOrderErrorResponseSchema
>;

export async function deleteOrderApi(
  params: DeleteOrderParamsSchema,
): Promise<DeleteOrderResponseSchema> {
  const response = await apiClient.delete<DeleteOrderResponseSchema>(
    `/orders/${params.orderId}`,
  );
  return response.data;
}
