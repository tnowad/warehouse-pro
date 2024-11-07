import { z } from "zod";

export const orderStatusSchema = z.enum([
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
]);
export type OrderStatusSchema = z.infer<typeof orderStatusSchema>;

export const paymentStatusSchema = z.enum(["PENDING", "PAID", "FAILED"]);

export const orderSchema = z.object({
  id: z.string().uuid(),
  status: orderStatusSchema,
  totalAmount: z.number().positive(),
  paymentStatus: paymentStatusSchema,
  shippingAddress: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
export type OrderSchema = z.infer<typeof orderSchema>;
