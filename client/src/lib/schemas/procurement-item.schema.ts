import { z } from "zod";

export const procurementItemSchema = z.object({
  id: z.coerce.string().uuid(),
  procurementId: z.coerce.string().uuid(),
  warehouseId: z.coerce.string().uuid(),
  productId: z.coerce.string().uuid(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
});
