import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  totalPrice: z.number().positive(),
  discount: z.number().min(0),
});
