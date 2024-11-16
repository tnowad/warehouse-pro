import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { roleSchema } from "../schemas/role.schema";

export const createRoleBodySchema = roleSchema
  .omit({ id: true })
  .pick({
    name: true,
    description: true,
  })
  .extend({
    permissionIds: z.array(z.string().min(1)).optional(),
  });
export type CreateRoleBodySchema = z.infer<typeof createRoleBodySchema>;

export const createRoleResponseSchema = roleSchema;

export type CreateRoleResponseSchema = z.infer<typeof createRoleResponseSchema>;

export const createRoleErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);

export type CreateRoleErrorResponseSchema = z.infer<
  typeof createRoleErrorResponseSchema
>;

export async function createRoleApi(body: CreateRoleBodySchema) {
  const response = await apiClient.post<CreateRoleResponseSchema>(
    "/roles",
    body,
  );
  return response.data;
}
