import { z } from "zod";
import { tokenSchema } from "../schemas/token.schema";
import { apiClient } from "../api/client";

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type LoginBodySchema = z.infer<typeof loginBodySchema>;
export const loginResponseSchema = z.object({
  message: z.string(),
  tokens: tokenSchema,
});
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;
export const loginErrorResponseSchema = z.object({
  message: z.string(),
});
export type LoginErrorResponseSchema = z.infer<typeof loginErrorResponseSchema>;

export async function loginApi(
  body: LoginBodySchema,
): Promise<LoginResponseSchema> {
  const response = await apiClient.post<LoginResponseSchema>(
    "/auth/login",
    body,
    {
      headers: {
        "No-Auth": true,
      },
    },
  );
  return response.data;
}
