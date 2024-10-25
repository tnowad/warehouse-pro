import { z } from "zod";
import { createWarehouseRequestSchema } from "./create-warehouse-request-schema";
import { warehouseResponseSchema } from "./warehouse-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";

export const postWarehouseCreateRequestSchema = createWarehouseRequestSchema;
export type PostWarehouseCreateRequestSchema = z.infer<
  typeof postWarehouseCreateRequestSchema
>;

export const postWarehouseCreateResponseSchema = warehouseResponseSchema;
export type PostWarehouseCreateResponseSchema = z.infer<
  typeof postWarehouseCreateResponseSchema
>;

export const postWarehouseCreateErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);
export type PostWarehouseCreateErrorResponseSchema = z.infer<
  typeof postWarehouseCreateErrorResponseSchema
>;
