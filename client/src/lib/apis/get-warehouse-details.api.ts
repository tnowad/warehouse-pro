import { z } from "zod";
import { warehouseSchema } from "../schemas/warehouse.schema";
import { apiClient } from "../api/client";

export const getWarehouseDetailsParamsSchema = z.object({
  id: z.string().uuid(),
});
export type GetWarehouseDetailsParamsSchema = z.infer<
  typeof getWarehouseDetailsParamsSchema
>;
export const getWarehouseDetailsResponseSchema = warehouseSchema;
export type GetWarehouseDetailsResponseSchema = z.infer<
  typeof getWarehouseDetailsResponseSchema
>;
export const getWarehouseDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetWarehouseDetailsErrorResponseSchema = z.infer<
  typeof getWarehouseDetailsErrorResponseSchema
>;

export async function getWarehouseDetailsApi(
  params: GetWarehouseDetailsParamsSchema,
): Promise<GetWarehouseDetailsResponseSchema> {
  const response = await apiClient.get<GetWarehouseDetailsResponseSchema>(
    `/warehouses/${params.id}`,
  );
  return response.data;
}
