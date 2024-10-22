import { z } from "zod";

export const createWarehouseRequestSchema = z.object({
  name: z.string().min(1).max(255),
  capacity: z.coerce.number().min(1),
  location: z.string().min(1).max(255),
});
export type CreateWarehouseRequest = z.infer<
  typeof createWarehouseRequestSchema
>;
