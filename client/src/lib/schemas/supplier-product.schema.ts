import { z } from "zod";

export const supplierProductSchema = z.object({
  id: z.string().uuid(),
  supplierId: z.string().uuid(),
  productId: z.string().uuid(),
  leadTimeDays: z.number().int().positive(),
  price: z.number().positive(),
  availabilityStatus: z.string(),
});

export type SupplierProductSchema = z.infer<typeof supplierProductSchema>;
