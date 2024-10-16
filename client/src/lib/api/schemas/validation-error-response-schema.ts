import { z } from "zod";

export const validationErrorResponseSchema = z.object({
  type: z.literal("ValidationError"),
  message: z.string(),
  errors: z.record(z.array(z.string())),
});
export type ValidationErrorResponseSchema = z.infer<
  typeof validationErrorResponseSchema
>;
