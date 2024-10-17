import { z } from "zod";

export const refreshTokenRequestSchema = z.object({
  refreshToken: z.coerce.string().min(1),
});
export type RefreshTokenRequestSchema = z.infer<
  typeof refreshTokenRequestSchema
>;
