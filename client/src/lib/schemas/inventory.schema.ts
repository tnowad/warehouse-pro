import { z } from "zod";

export const inventorySchema = z.object({
  id: z.string().uuid(),
  warehouseId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int(),
  lastUpdated: z.string().date(),
  minimumStockLevel: z.number().int(),
  status: z.string(),
});
