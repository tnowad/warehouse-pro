import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  contactInfo: z.string(),
  address: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
