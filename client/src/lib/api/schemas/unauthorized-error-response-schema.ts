import { z } from "zod";

export const unauthorizedErrorResponseSchema = z.object({
  type: z.literal("UnauthorizedError"),
  message: z.string(),
});
export type UnauthorizedErrorResponse = z.infer<
  typeof unauthorizedErrorResponseSchema
>;
