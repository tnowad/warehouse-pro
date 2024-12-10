import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { inventorySchema } from "../schemas/inventory.schema";

export const createInventoryBodySchema = inventorySchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    quantity: z.number().int().nonnegative(),
    price: z.number().nonnegative(),
    minimumStockLevel: z.number().int().nonnegative(),
    status: z.enum(["ACTIVE", "IN_ACTIVE"]),
  });
export type CreateInventoryBodySchema = z.infer<
  typeof createInventoryBodySchema
>;

export const createInventoryResponseSchema = inventorySchema;
export type CreateInventoryResponseSchema = z.infer<
  typeof createInventoryResponseSchema
>;

export const createInventoryErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type CreateInventoryErrorResponseSchema = z.infer<
  typeof createInventoryErrorResponseSchema
>;

export async function createInventoryApi(body: CreateInventoryBodySchema) {
  const response = await apiClient.post<CreateInventoryResponseSchema>(
    "/inventories",
    body,
  );
  return response.data;
}
