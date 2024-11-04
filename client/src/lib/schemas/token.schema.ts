import { z } from "zod";

export const jwtPayloadSchema = z.object({
  iss: z.string(),
  sub: z.string().optional(),
  aud: z.union([z.array(z.string()), z.string()]).optional(),
  exp: z.number().optional(),
  nbf: z.number().optional(),
  iat: z.number().optional(),
  jti: z.string().optional(),
});

export const accessTokenPayloadSchema = jwtPayloadSchema
  .omit({
    iss: true,
    aud: true,
    nbf: true,
  })
  .extend({
    iss: z.string(),
    sub: z.string(),
    aud: z.union([z.array(z.string()), z.string()]).optional(),
    exp: z.number(),
    iat: z.number(),
    roles: z.array(z.string()).optional(),
  });

export type AccessTokenPayloadSchema = z.infer<typeof accessTokenPayloadSchema>;
export const refreshTokenPayloadSchema = jwtPayloadSchema
  .omit({
    iss: true,
    aud: true,
    nbf: true,
  })
  .extend({
    iss: z.string().optional(),
    sub: z.string(),
    exp: z.number(),
    iat: z.number(),
    jti: z.string(),
  });
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
