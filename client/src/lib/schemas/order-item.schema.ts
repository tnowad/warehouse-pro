import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.coerce.string().uuid(),
  orderId: z.coerce.string().uuid(),
  productId: z.coerce.string().uuid(),
  warehouseId: z.coerce.string().uuid(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  totalPrice: z.coerce.number().positive(),
  discount: z.coerce.number().min(0),
});
