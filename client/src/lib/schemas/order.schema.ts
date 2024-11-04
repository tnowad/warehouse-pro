import { z } from "zod";

export const orderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  status: z.string(),
  orderDate: z.string().date(),
  totalAmount: z.number().positive(),
  paymentStatus: z.string(),
  shippingAddress: z.string(),
});
