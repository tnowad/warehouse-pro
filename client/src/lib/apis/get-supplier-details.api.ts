import { z } from "zod";
import { supplierSchema } from "../schemas/supplier.schema";
import { unauthorizedErrorResponseSchema } from "../api/schemas/unauthorized-error-response-schema";
import { apiClient } from "../api/client";

export const getSupplierDetailsParamsSchema = z.object({
  supplierId: z.string().uuid(),
});
export type GetSupplierDetailsParamsSchema = z.infer<
  typeof getSupplierDetailsParamsSchema
>;

export const getSupplierDetailsResponseSchema = supplierSchema;
export type GetSupplierDetailsResponseSchema = z.infer<
  typeof getSupplierDetailsResponseSchema
>;

export const getSupplierDetailsErrorResponseSchema = z.discriminatedUnion(
  "type",
  [unauthorizedErrorResponseSchema],
);
export type GetSupplierDetailsErrorResponseSchema = z.infer<
  typeof getSupplierDetailsErrorResponseSchema
>;

export async function getSupplierDetailsApi(
  params: GetSupplierDetailsParamsSchema,
) {
  const response = await apiClient.get<GetSupplierDetailsResponseSchema>(
    `/suppliers/${params.supplierId}`,
  );
  return response.data;
}
