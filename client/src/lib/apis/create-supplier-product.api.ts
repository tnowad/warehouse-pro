import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { supplierProductSchema } from "../schemas/supplier-product.schema";

export const createSupplierProductBodySchema = supplierProductSchema
  .omit({ id: true })
  .extend({
    leadTimeDays: z.number().int().positive(),
    price: z.number().positive(),
    availabilityStatus: z.string(),
  });
export type CreateSupplierProductBodySchema = z.infer<
  typeof createSupplierProductBodySchema
>;

export const createSupplierProductResponseSchema = supplierProductSchema;
export type CreateSupplierProductResponseSchema = z.infer<
  typeof createSupplierProductResponseSchema
>;

export const createSupplierProductErrorResponseSchema = z.discriminatedUnion(
  "type",
  [validationErrorResponseSchema],
);
export type CreateSupplierProductErrorResponseSchema = z.infer<
  typeof createSupplierProductErrorResponseSchema
>;

export async function createSupplierProductApi(
  body: CreateSupplierProductBodySchema,
) {
  const response = await apiClient.post<CreateSupplierProductResponseSchema>(
    "/supplier-products",
    body,
  );
  return response.data;
}
