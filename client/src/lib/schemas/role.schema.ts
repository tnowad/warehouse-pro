import { z } from "zod";

export const roleSchema = z.object({
  name: z.string(),
  description: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
