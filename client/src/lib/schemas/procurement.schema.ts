import { z } from "zod";

export const procurementSchema = z.object({
  id: z.string().uuid(),
  supplierId: z.string().uuid(),
  orderDate: z.string().date(),
  deliveryDate: z.string().date(),
  status: z.string(),
  totalCost: z.number().positive(),
  createdAt: z.string().date(),
});
