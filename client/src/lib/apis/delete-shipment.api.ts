import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteShipmentParamsSchema = z.object({
  shipmentId: z.string().uuid(),
});
export type DeleteShipmentParamsSchema = z.infer<
  typeof deleteShipmentParamsSchema
>;

export const deleteShipmentResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteShipmentResponseSchema = z.infer<
  typeof deleteShipmentResponseSchema
>;

export const deleteShipmentErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteShipmentErrorResponseSchema = z.infer<
  typeof deleteShipmentErrorResponseSchema
>;

export async function deleteShipmentApi(
  params: DeleteShipmentParamsSchema,
): Promise<DeleteShipmentResponseSchema> {
  const response = await apiClient.delete<DeleteShipmentResponseSchema>(
    `/shipments/${params.shipmentId}`,
  );
  return response.data;
}
