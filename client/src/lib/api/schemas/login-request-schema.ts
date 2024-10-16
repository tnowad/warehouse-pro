import { z } from "zod";

export const loginRequestSchema = z.object({
  email: z.coerce.string().email().min(1),
  password: z.coerce.string().min(6).max(20),
});
export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;
