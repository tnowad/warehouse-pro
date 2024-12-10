import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { inventorySchema } from "../schemas/inventory.schema";

export const updateInventoryParamsSchema = z.object({
  inventoryId: z.string().uuid(),
});
export type UpdateInventoryParamsSchema = z.infer<
  typeof updateInventoryParamsSchema
>;

export const updateInventoryBodySchema = z.object({
  warehouseId: z.coerce.string().uuid().optional(),
  productId: z.coerce.string().uuid().optional(),
  quantity: z.coerce.number().nonnegative().optional(),
  price: z.coerce.number().nonnegative().optional(),
  minimumStockLevel: z.coerce.number().nonnegative().optional(),
  status: z.enum(["ACTIVE", "IN_ACTIVE"]).optional(),
});
export type UpdateInventoryBodySchema = z.infer<
  typeof updateInventoryBodySchema
>;

export const updateInventoryResponseSchema = inventorySchema;
export type UpdateInventoryResponseSchema = z.infer<
  typeof updateInventoryResponseSchema
>;

export const updateInventoryErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type UpdateInventoryErrorResponseSchema = z.infer<
  typeof updateInventoryErrorResponseSchema
>;

export async function updateInventoryApi(
  params: UpdateInventoryParamsSchema,
  body: UpdateInventoryBodySchema,
) {
  const response = await apiClient.put<UpdateInventoryResponseSchema>(
    `/inventories/${params.inventoryId}`,
    body,
  );
  return response.data;
}
