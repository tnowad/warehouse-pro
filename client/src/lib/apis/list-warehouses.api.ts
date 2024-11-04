import { z } from "zod";
import { warehouseSchema } from "../schemas/warehouse.schema";
import { apiClient } from "../api/client";

export const listWarehousesQueryFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  name: z.string().optional(),
  location: z.string().optional(),
  capacity: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type ListWarehousesQueryFilterSchema = z.infer<
  typeof listWarehousesQueryFilterSchema
>;

export const listWarehousesQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listWarehousesQueryFilterSchema);

export type ListWarehousesQuerySchema = z.infer<
  typeof listWarehousesQuerySchema
>;
export const listWarehousesResponseSchema = z.object({
  items: z.array(warehouseSchema),
  rowCount: z.number(),
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
