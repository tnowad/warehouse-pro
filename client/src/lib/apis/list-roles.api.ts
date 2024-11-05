import { z } from "zod";
import { roleSchema } from "../schemas/role.schema";
import { apiClient } from "../api/client";

export const listRolesQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const listRolesQuerySchema = z.object({
  query: z.string().optional(),
});

export const listRolesResponseSchema = z.object({
  items: z.array(roleSchema),
  rowCount: z.number(),
});
export type ListRolesResponseSchema = z.infer<typeof listRolesResponseSchema>;

export const listRolesErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListRolesErrorResponseSchema = z.infer<
  typeof listRolesErrorResponseSchema
>;

export async function listRolesApi(): Promise<ListRolesResponseSchema> {
  const response = await apiClient.get<ListRolesResponseSchema>("/roles");
  return response.data;
}
