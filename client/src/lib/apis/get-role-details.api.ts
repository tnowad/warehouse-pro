import { z } from "zod";
import { roleSchema } from "../schemas/role.schema";
import { apiClient } from "../api/client";

export const getRoleDetailsParamsSchema = z.object({
  id: z.string().uuid(),
});
export type GetRoleDetailsParamsSchema = z.infer<
  typeof getRoleDetailsParamsSchema
>;

export const getRoleDetailsResponseSchema = roleSchema;
export type GetRoleDetailsResponseSchema = z.infer<
  typeof getRoleDetailsResponseSchema
>;

export const getRoleDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetRoleDetailsErrorResponseSchema = z.infer<
  typeof getRoleDetailsErrorResponseSchema
>;

export async function getRoleDetailsApi(
  params: GetRoleDetailsParamsSchema,
): Promise<GetRoleDetailsResponseSchema> {
  const response = await apiClient.get<GetRoleDetailsResponseSchema>(
    `/roles/${params.id}`,
  );
  return response.data;
}
