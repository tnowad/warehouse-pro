import { z } from "zod";

export const roleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type RoleSchema = z.infer<typeof roleSchema>;
