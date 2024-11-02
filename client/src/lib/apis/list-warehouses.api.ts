import { z } from "zod";
import { warehouseSchema } from "../schemas/warehouse.schema";
import { apiClient } from "../api/client";

export const listWarehousesQuerySchema = z.object({});
export type ListWarehousesQuerySchema = z.infer<
  typeof listWarehousesQuerySchema
>;
export const listWarehousesResponseSchema = z.object({
  items: z.array(warehouseSchema),
});
export type ListWarehousesResponseSchema = z.infer<
  typeof listWarehousesResponseSchema
>;
export const listWarehousesErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListWarehousesErrorResponseSchema = z.infer<
  typeof listWarehousesErrorResponseSchema
>;
export async function listWarehousesApi(
  query: ListWarehousesQuerySchema,
): Promise<ListWarehousesResponseSchema> {
  const response = await apiClient.get<ListWarehousesResponseSchema>(
    "/warehouses",
    query,
  );
  return response.data;
}
