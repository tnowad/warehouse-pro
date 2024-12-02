import { z } from "zod";
import { supplierSchema } from "../schemas/supplier.schema";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { apiClient } from "../api/client";

export const createSupplierBodySchema = supplierSchema.pick({
  name: true,
  contactInfo: true,
  address: true,
});
export type CreateSupplierBodySchema = z.infer<typeof createSupplierBodySchema>;

export const createSupplierResponseSchema = supplierSchema;
export type CreateSupplierResponseSchema = z.infer<
  typeof createSupplierResponseSchema
>;

export const createSupplierErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type CreateSupplierErrorResponseSchema = z.infer<
  typeof createSupplierErrorResponseSchema
>;

export async function createSupplierApi(body: CreateSupplierBodySchema) {
  const response = await apiClient.post<CreateSupplierResponseSchema>(
    "/suppliers",
    body,
  );
  return response.data;
}
