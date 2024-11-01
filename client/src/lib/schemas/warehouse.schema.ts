import { z } from "zod";

export const warehouseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  location: z.string(),
  capacity: z.number().int().positive(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});
export type WarehouseSchema = z.infer<typeof warehouseSchema>;
