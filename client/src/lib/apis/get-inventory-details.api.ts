import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { inventorySchema } from "../schemas/inventory.schema";

export const getInventoryDetailsParamsSchema = z.object({
  inventoryId: z.string().uuid(),
});
export type GetInventoryDetailsParamsSchema = z.infer<
  typeof getInventoryDetailsParamsSchema
>;

export const getInventoryDetailsResponseSchema = inventorySchema;
export type GetInventoryDetailsResponseSchema = z.infer<
  typeof getInventoryDetailsResponseSchema
>;

export const getInventoryDetailsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [validationErrorResponseSchema],
);
export type GetInventoryDetailsErrorResponseSchema = z.infer<
  typeof getInventoryDetailsErrorResponseSchema
>;

export async function getInventoryDetailsApi(
  params: GetInventoryDetailsParamsSchema,
) {
  const response = await apiClient.get<GetInventoryDetailsResponseSchema>(
    `/inventories/${params.inventoryId}`,
  );
  return response.data;
}
