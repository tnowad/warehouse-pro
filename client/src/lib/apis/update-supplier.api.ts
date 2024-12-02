import { z } from "zod";
import { supplierSchema } from "../schemas/supplier.schema";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { apiClient } from "../api/client";

export const updateSupplierParamsSchema = z.object({
  supplierId: z.string().uuid(),
});
export type UpdateSupplierParamsSchema = z.infer<
  typeof updateSupplierParamsSchema
>;

export const updateSupplierBodySchema = supplierSchema.pick({
  name: true,
  contactInfo: true,
  address: true,
});
export type UpdateSupplierBodySchema = z.infer<typeof updateSupplierBodySchema>;

export const updateSupplierResponseSchema = supplierSchema;
export type UpdateSupplierResponseSchema = z.infer<
  typeof updateSupplierResponseSchema
>;

export const updateSupplierErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type UpdateSupplierErrorResponseSchema = z.infer<
  typeof updateSupplierErrorResponseSchema
>;

export async function updateSupplierApi(
  params: UpdateSupplierParamsSchema,
  body: UpdateSupplierBodySchema,
) {
  const response = await apiClient.put<UpdateSupplierResponseSchema>(
    `/suppliers/${params.supplierId}`,
    body,
  );
  return response.data;
}
