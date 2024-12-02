import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteSupplierParamsSchema = z.object({
  supplierId: z.string().uuid(),
});
export type DeleteSupplierParamsSchema = z.infer<
  typeof deleteSupplierParamsSchema
>;

export const deleteSupplierResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteSupplierResponseSchema = z.infer<
  typeof deleteSupplierResponseSchema
>;

export const deleteSupplierErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteSupplierErrorResponseSchema = z.infer<
  typeof deleteSupplierErrorResponseSchema
>;

export async function deleteSupplierApi(
  params: DeleteSupplierParamsSchema,
): Promise<DeleteSupplierResponseSchema> {
  const response = await apiClient.delete<DeleteSupplierResponseSchema>(
    `/suppliers/${params.supplierId}`,
  );
  return response.data;
}
