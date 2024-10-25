import { z } from "zod";
import { userResponseSchema } from "./user-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";

export const getCurrentUserRequestSchema = z.unknown();
export type GetCurrentUserRequestSchema = z.infer<
  typeof getCurrentUserRequestSchema
>;

export const getCurrentUserResponseSchema = userResponseSchema;
export type GetCurrentUserResponseSchema = z.infer<
  typeof getCurrentUserResponseSchema
>;

export const getCurrentUserErrorResponseSchema = z.discriminatedUnion("type", [
  unauthorizedErrorResponseSchema,
]);
export type GetCurrentUserErrorResponseSchema = z.infer<
  typeof getCurrentUserErrorResponseSchema
>;
