import { z } from "zod";

export const inventorySchema = z.object({
  id: z.string().uuid(),
  warehouseId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.number().int(),
  price: z.number().int(),
  minimumStockLevel: z.number().int(),
  status: z.enum(["ACTIVE", "IN_ACTIVE"]),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export type InventorySchema = z.infer<typeof inventorySchema>;
