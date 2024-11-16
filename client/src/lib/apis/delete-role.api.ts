import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteRoleParamsSchema = z.object({
  roleId: z.string().uuid(),
});
export type DeleteRoleParamsSchema = z.infer<typeof deleteRoleParamsSchema>;

export const deleteRoleResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteRoleResponseSchema = z.infer<typeof deleteRoleResponseSchema>;

export const deleteRoleErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteRoleErrorResponseSchema = z.infer<
  typeof deleteRoleErrorResponseSchema
>;

export async function deleteRoleApi(
  params: DeleteRoleParamsSchema,
): Promise<DeleteRoleResponseSchema> {
  const response = await apiClient.delete<DeleteRoleResponseSchema>(
    `/roles/${params.roleId}`,
  );
  return response.data;
}
