import { z } from "zod";

export const orderItemStatus = z.enum([
  "PENDING",
  "SHIPPED",
  "DELIVERED",
  "RETURNED",
  "CANCELED",
]);
export type OrderItemStatus = z.infer<typeof orderItemStatus>;

export const orderItemSchema = z.object({
  id: z.coerce.string().uuid(),
  orderId: z.coerce.string().uuid(),
  productId: z.coerce.string().uuid(),
  warehouseId: z.coerce.string().uuid(),
  quantity: z.coerce.number().int().positive(),
  price: z.coerce.number().positive(),
  totalPrice: z.coerce.number().positive(),
  discount: z.coerce.number().min(0),
  status: orderItemStatus,
});

export type OrderItemSchema = z.infer<typeof orderItemSchema>;
