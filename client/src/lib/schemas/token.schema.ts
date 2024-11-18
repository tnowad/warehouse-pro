import { z } from "zod";

export const jwtPayloadSchema = z.object({
  sub: z.string(),
  exp: z.number(),
  iat: z.number(),
});

export const accessTokenPayloadSchema = jwtPayloadSchema;
export type AccessTokenPayloadSchema = z.infer<typeof accessTokenPayloadSchema>;
export const refreshTokenPayloadSchema = jwtPayloadSchema;
export type RefreshTokenPayloadSchema = z.infer<
  typeof refreshTokenPayloadSchema
>;

export const accessTokenSchema = z.string();
export type AccessTokenSchema = z.infer<typeof accessTokenSchema>;
export const refreshTokenSchema = z.string();
export type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;

export const tokenSchema = z.object({
  accessToken: accessTokenSchema,
  refreshToken: refreshTokenSchema,
});
export type TokenSchema = z.infer<typeof tokenSchema>;
