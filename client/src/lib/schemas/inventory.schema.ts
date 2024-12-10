import { z } from "zod";

export const inventorySchema = z.object({
  id: z.string().uuid(),
  warehouseId: z.string().uuid(),
  productId: z.string().uuid(),
  quantity: z.coerce.number().int(),
  price: z.coerce.number().int(),
  minimumStockLevel: z.coerce.number().int(),
  status: z.enum(["ACTIVE", "IN_ACTIVE"]),
  updatedAt: z.string(),
  createdAt: z.string(),
});
export type InventorySchema = z.infer<typeof inventorySchema>;
