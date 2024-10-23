import { z } from "zod";
import { warehouseResponseSchema } from "./warehouse-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";

export const getWarehouseDetailsRequestSchema = z.unknown();
export type GetWarehouseDetailsRequestSchema = z.infer<
  typeof getWarehouseDetailsRequestSchema
>;

export const getWarehouseDetailsResponseSchema = warehouseResponseSchema;
export type GetWarehouseDetailsResponseSchema = z.infer<
  typeof getWarehouseDetailsResponseSchema
>;

export const getWarehouseDetailsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);
export type GetWarehouseDetailsErrorResponseSchema = z.infer<
  typeof getWarehouseDetailsErrorResponseSchema
>;
