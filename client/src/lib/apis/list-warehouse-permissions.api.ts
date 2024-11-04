import { apiClient } from "@/lib/api/client";
import { permissionSchema } from "@/lib/schemas/permission.schema";
import { z } from "zod";

export const listWarehousePermissionsParamsSchema = z.object({
  id: z.string().uuid(),
});
export type ListWarehousePermissionsParamsSchema = z.infer<
  typeof listWarehousePermissionsParamsSchema
>;

export const listWarehousePermissionsResponseSchema = z.object({
  items: z.array(
    permissionSchema.extend({
      enabled: z.boolean(),
    }),
  ),
});
export type ListWarehousePermissionsResponseSchema = z.infer<
  typeof listWarehousePermissionsResponseSchema
>;

export const listWarehousePermissionsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListWarehousePermissionsErrorResponseSchema = z.infer<
  typeof listWarehousePermissionsErrorResponseSchema
>;

export async function listWarehousePermissionsApi(
  params: ListWarehousePermissionsParamsSchema,
): Promise<ListWarehousePermissionsResponseSchema> {
  const response = await apiClient.get<ListWarehousePermissionsResponseSchema>(
    `/warehouses/${params.id}/permissions`,
  );
  return response.data;
}
