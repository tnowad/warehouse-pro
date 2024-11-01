import { z } from "zod";

export const shipmentSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  shipmentDate: z.string().date(),
  status: z.string(),
  trackingNumber: z.string(),
  shippingMethod: z.string(),
  deliveryEstimate: z.string().date(),
  carrier: z.string(),
});
