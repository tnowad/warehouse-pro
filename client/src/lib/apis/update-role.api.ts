import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { roleSchema } from "../schemas/role.schema";

export const updateRoleParamsSchema = z.object({
  roleId: z.string().uuid(),
});
export type UpdateRoleParamsSchema = z.infer<typeof updateRoleParamsSchema>;

export const updateRoleBodySchema = roleSchema
  .omit({ id: true })
  .pick({
    name: true,
    description: true,
  })
  .extend({
    permissionIds: z.array(z.string().min(1)).optional(),
  });
export type UpdateRoleBodySchema = z.infer<typeof updateRoleBodySchema>;

export const updateRoleResponseSchema = roleSchema;
export type UpdateRoleResponseSchema = z.infer<typeof updateRoleResponseSchema>;

export const updateRoleErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type UpdateRoleErrorResponseSchema = z.infer<
  typeof updateRoleErrorResponseSchema
>;

export async function updateRoleApi(
  params: UpdateRoleParamsSchema,
  body: UpdateRoleBodySchema,
) {
  const response = await apiClient.put<UpdateRoleResponseSchema>(
    `/roles/${params.roleId}`,
    body,
  );
  return response.data;
}
