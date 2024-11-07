import { z } from "zod";
import { roleSchema } from "../schemas/role.schema";
import { apiClient } from "../api/client";

export const listWarehouseRolesParamsSchema = z.object({
  warehouseId: z.string(),
});
export type ListWarehouseRolesParamsSchema = z.infer<
  typeof listWarehouseRolesParamsSchema
>;

export const listWarehouseRolesQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const listWarehouseRolesQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listWarehouseRolesQueryFilterSchema);
export type ListWarehouseRolesQuerySchema = z.infer<
  typeof listWarehouseRolesQuerySchema
>;

export const listWarehouseRolesResponseSchema = z.object({
  items: z.array(roleSchema),
  rowCount: z.number(),
});
export type ListWarehouseRolesResponseSchema = z.infer<
  typeof listWarehouseRolesResponseSchema
>;

export const listWarehouseRolesErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListWarehouseRolesErrorResponseSchema = z.infer<
  typeof listWarehouseRolesErrorResponseSchema
>;

export async function listWarehouseRolesApi(
  params: ListWarehouseRolesParamsSchema,
  query: ListWarehouseRolesQuerySchema,
): Promise<ListWarehouseRolesResponseSchema> {
  const response = await apiClient.get<ListWarehouseRolesResponseSchema>(
    `/warehouses/${params.warehouseId}/roles`,
    query,
  );
  return response.data;
}
