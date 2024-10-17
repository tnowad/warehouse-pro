import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.coerce.string(),
  email: z.string(),
  name: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime().optional(),
});
export type UserResponseSchema = z.infer<typeof userResponseSchema>;
