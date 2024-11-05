import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export type ProductSchema = z.infer<typeof productSchema>;
