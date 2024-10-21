import { z } from "zod";
import { paginatedResponseSchema } from "./paginated-response-schema";
import { warehouseResponseSchema } from "./warehouse-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";
import { getListQueryParamsSchema } from "./get-list-query-params-schema";

export const getWarehouseListQueryParamsSchema = getListQueryParamsSchema;
export type GetWarehouseListQueryParams = z.infer<
  typeof getWarehouseListQueryParamsSchema
>;

export const getWarehouseListResponseSchema = paginatedResponseSchema.extend({
  items: z.array(warehouseResponseSchema),
});
export type GetWarehouseListResponse = z.infer<
  typeof getWarehouseListResponseSchema
>;

export const getWarehouseListErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);
export type GetWarehouseListErrorResponseSchema = z.infer<
  typeof getWarehouseListErrorResponseSchema
>;
