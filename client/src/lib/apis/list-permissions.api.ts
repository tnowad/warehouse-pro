import { z } from "zod";
import { apiClient } from "../api/client";
import { permissionSchema } from "../schemas/permission.schema";

export const listPermissionsQuerySchema = z.object({
  query: z.string().optional(),
  page: z.number().optional(),
  pageSize: z.number().optional(),
  sort: z.string().optional(),
});

export type ListPermissionsQuerySchema = z.infer<
  typeof listPermissionsQuerySchema
>;

export const listPermissionsResponseSchema = z.object({
  items: z.array(permissionSchema),
  rowCount: z.number(),
});
export type ListPermissionsResponseSchema = z.infer<
  typeof listPermissionsResponseSchema
>;

export const listPermissionsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListPermissionsErrorResponseSchema = z.infer<
  typeof listPermissionsErrorResponseSchema
>;

export async function listPermissionsApi(
  query: ListPermissionsQuerySchema,
): Promise<ListPermissionsResponseSchema> {
  const response = await apiClient.get<ListPermissionsResponseSchema>(
    `/permissions`,
    query,
  );
  return response.data;
}
