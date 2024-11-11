import { z } from "zod";
import { userSchema } from "../schemas/user.schema";
import { apiClient } from "../api/client";

export const getUserDetailsParamsSchema = z.object({
  userId: z.string(),
});
export type GetUserDetailsParamsSchema = z.infer<
  typeof getUserDetailsParamsSchema
>;

export const getUserDetailsResponseSchema = userSchema
  .omit({
    password: true,
  })
  .extend({
    roles: z.array(z.string()),
  });
export type GetUserDetailsResponseSchema = z.infer<
  typeof getUserDetailsResponseSchema
>;

export const getUserDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetUserDetailsErrorResponseSchema = z.infer<
  typeof getUserDetailsErrorResponseSchema
>;

export async function getUserDetailsApi(params: GetUserDetailsParamsSchema) {
  const response = await apiClient.get<GetUserDetailsResponseSchema>(
    `/users/${params.userId}`,
  );
  return response.data;
}
