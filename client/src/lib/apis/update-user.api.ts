import { z } from "zod";
import { apiClient } from "../api/client";
import { roleSchema } from "../schemas/role.schema";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const updateUserParamsSchema = z.object({
  userId: z.string().uuid(),
});
export type UpdateUserParamsSchema = z.infer<typeof updateUserParamsSchema>;

export const updateUserBodySchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).max(100).optional().or(z.literal("")),
  roleIds: z.array(z.string().uuid()).optional(),
});
export type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>;

export const updateUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  roles: z.array(roleSchema),
});
export type UpdateUserResponseSchema = z.infer<typeof updateUserResponseSchema>;

export const updateUserErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type UpdateUserErrorResponseSchema = z.infer<
  typeof updateUserErrorResponseSchema
>;

export async function updateUserApi(
  params: UpdateUserParamsSchema,
  body: UpdateUserBodySchema,
) {
  const response = await apiClient.put<UpdateUserResponseSchema>(
    `/users/${params.userId}`,
    body,
  );
  return response.data;
}
