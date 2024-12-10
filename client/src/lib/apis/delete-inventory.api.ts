import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteInventoryParamsSchema = z.object({
  inventoryId: z.string().uuid(),
});
export type DeleteInventoryParamsSchema = z.infer<
  typeof deleteInventoryParamsSchema
>;

export const deleteInventoryResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteInventoryResponseSchema = z.infer<
  typeof deleteInventoryResponseSchema
>;

export const deleteInventoryErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteInventoryErrorResponseSchema = z.infer<
  typeof deleteInventoryErrorResponseSchema
>;

export async function deleteInventoryApi(
  params: DeleteInventoryParamsSchema,
): Promise<DeleteInventoryResponseSchema> {
  const response = await apiClient.delete<DeleteInventoryResponseSchema>(
    `/inventories/${params.inventoryId}`,
  );
  return response.data;
}
