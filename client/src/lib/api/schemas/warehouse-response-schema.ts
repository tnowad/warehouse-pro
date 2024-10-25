import { z } from "zod";

export const warehouseResponseSchema = z.object({
  id: z.coerce.string(),
  name: z.coerce.string(),
  location: z.coerce.string(),
  capacity: z.coerce.number(),
  createdAt: z.coerce.string().datetime(),
  updatedAt: z.coerce.string().datetime(),
});
export type WarehouseResponseSchema = z.infer<typeof warehouseResponseSchema>;
