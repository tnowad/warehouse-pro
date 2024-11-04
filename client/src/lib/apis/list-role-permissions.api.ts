import { z } from "zod";
import { permissionNameSchema } from "../schemas/permission.schema";
import { apiClient } from "../api/client";

export const listRolePermissionsParamsSchema = z.object({
  id: z.string().uuid(),
});
export type ListRolePermissionsParamsSchema = z.infer<
  typeof listRolePermissionsParamsSchema
>;

export const listRolePermissionsResponseSchema = z.object({
  items: z.record(permissionNameSchema, z.boolean()),
});
export type ListRolePermissionsResponseSchema = z.infer<
  typeof listRolePermissionsResponseSchema
>;

export const listRolePermissionsErrorResponseSchema = z.object({
  message: z.string(),
});

export async function listRolePermissionsApi(
  params: ListRolePermissionsParamsSchema,
): Promise<ListRolePermissionsResponseSchema> {
  const response = await apiClient.get<ListRolePermissionsResponseSchema>(
    `/roles/${params.id}/permissions`,
  );
  return response.data;
}
