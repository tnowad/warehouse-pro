import { z } from "zod";
import { warehouseResponseSchema } from "./warehouse-response-schema";
import { validationErrorResponseSchema } from "./validation-error-response-schema";
import { unauthorizedErrorResponseSchema } from "./unauthorized-error-response-schema";

export const postWarehouseDetailsUpdateRequestSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  capacity: z.number(),
});
export type PostWarehouseDetailsUpdateRequestSchema = z.infer<
  typeof postWarehouseDetailsUpdateRequestSchema
>;

export const postWarehouseDetailsUpdateResponseSchema = warehouseResponseSchema;
export type PostWarehouseDetailsUpdateResponseSchema = z.infer<
  typeof postWarehouseDetailsUpdateResponseSchema
>;

export const postWarehouseDetailsUpdateErrorResponseSchema =
  z.discriminatedUnion("type", [
    validationErrorResponseSchema,
    unauthorizedErrorResponseSchema,
  ]);
export type PostWarehouseDetailsUpdateErrorResponseSchema = z.infer<
  typeof postWarehouseDetailsUpdateErrorResponseSchema
>;
