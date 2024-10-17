import { z } from "zod";
import { RefreshTokenRequestSchema } from "./refresh-token-request-schema";
import { RefreshTokenResponseSchema } from "./refresh-token-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";
import { validationErrorResponseSchema } from "./validation-error-response-schema";

export type PostAuthRefreshRequestSchema = RefreshTokenRequestSchema;
export type PostAuthRefreshResponseSchema = RefreshTokenResponseSchema;

export const postAuthRefreshErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
  validationErrorResponseSchema,
]);

export type PostAuthRefreshErrorResponseSchema = z.infer<
  typeof postAuthRefreshErrorResponseSchema
>;
