import { z } from "zod";

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
});
export type RefreshTokenResponseSchema = z.infer<
  typeof refreshTokenResponseSchema
>;
