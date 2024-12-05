import { z } from "zod";
import { inventorySchema } from "../schemas/inventory.schema";
import { apiClient } from "../api/client";

export const listInventoriesQueryFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  warehouse: z.string().optional(),
  product: z.string().optional(),
  warehouseIds: z.string().uuid().array().optional(),
  productIds: z.string().uuid().array().optional(),
  status: z.string().optional(),
});
export type ListInventoriesQueryFilterSchema = z.infer<
  typeof listInventoriesQueryFilterSchema
>;

export const listInventoriesQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listInventoriesQueryFilterSchema);

export type ListInventoriesQuerySchema = z.infer<
  typeof listInventoriesQuerySchema
>;

export const listInventoriesResponseSchema = z.object({
  items: z.array(inventorySchema),
  rowCount: z.number(),
});
export type ListInventoriesResponseSchema = z.infer<
  typeof listInventoriesResponseSchema
>;

export const listInventoriesErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListInventoriesErrorResponseSchema = z.infer<
  typeof listInventoriesErrorResponseSchema
>;

export async function listInventoriesApi(
  query: ListInventoriesQuerySchema,
): Promise<ListInventoriesResponseSchema> {
  const response = await apiClient.get<ListInventoriesResponseSchema>(
    "/inventories",
    query,
  );
  return response.data;
}
