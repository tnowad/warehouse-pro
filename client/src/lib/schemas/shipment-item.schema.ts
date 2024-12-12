import { z } from "zod";

export const shipmentItemSchema = z.object({
  id: z.string().uuid(),
  shipmentId: z.string().uuid(),
  orderItemId: z.string().uuid(),
});
