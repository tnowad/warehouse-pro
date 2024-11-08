import { z } from "zod";
import { apiClient } from "../api/client";
import { roleSchema } from "../schemas/role.schema";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const createUserBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  roleIds: z.array(z.string().uuid()),
});
export type CreateUserBodySchema = z.infer<typeof createUserBodySchema>;

export const createUserResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  roles: z.array(roleSchema),
});
export type CreateUserResponseSchema = z.infer<typeof createUserResponseSchema>;

export const createUserErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type CreateUserErrorResponseSchema = z.infer<
  typeof createUserErrorResponseSchema
>;

export function createUserApi(body: CreateUserBodySchema) {
  return apiClient.post<CreateUserResponseSchema>("/users", body);
}
