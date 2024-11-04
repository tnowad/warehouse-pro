import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  password: z.string(),
  email: z.string().email(),
  name: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
export type UserSchema = z.infer<typeof userSchema>;
