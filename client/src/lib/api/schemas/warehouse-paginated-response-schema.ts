import { z } from "zod";
import { paginatedResponseSchema } from "./paginated-response-schema";
import { warehouseResponseSchema } from "./warehouse-response-schema";

export const warehousePaginatedResponseSchema = paginatedResponseSchema.extend({
  items: z.lazy(() => z.array(warehouseResponseSchema)),
});

export type WarehousePaginatedResponse = z.infer<
  typeof warehousePaginatedResponseSchema
>;
