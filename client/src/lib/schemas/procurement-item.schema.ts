import { z } from "zod";

export const procurementItemSchema = z.object({
  id: z.string().uuid(),
  procurementId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});
