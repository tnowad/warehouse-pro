import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteUserParamsSchema = z.object({
  userId: z.string().uuid(),
});
export type DeleteUserParamsSchema = z.infer<typeof deleteUserParamsSchema>;

export const deleteUserResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteUserResponseSchema = z.infer<typeof deleteUserResponseSchema>;

export const deleteUserErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteUserErrorResponseSchema = z.infer<
  typeof deleteUserErrorResponseSchema
>;

export async function deleteUserApi(
  params: DeleteUserParamsSchema,
): Promise<DeleteUserResponseSchema> {
  const response = await apiClient.delete<DeleteUserResponseSchema>(
    `/users/${params.userId}`,
  );
  return response.data;
}
