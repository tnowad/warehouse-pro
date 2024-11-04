import { z } from "zod";

export const shipmentItemSchema = z.object({
  id: z.string().uuid(),
  shipmentId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  orderItemsId: z.string().uuid(),
  quantity: z.number().int(),
});
