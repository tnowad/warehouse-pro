import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const updateProductParamsSchema = z.object({
  productId: z.string().uuid(),
});
export type UpdateProductParamsSchema = z.infer<
  typeof updateProductParamsSchema
>;

export const updateProductBodySchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  sku: z.string().optional(),
});
export type UpdateProductBodySchema = z.infer<typeof updateProductBodySchema>;

export const updateProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UpdateProductResponseSchema = z.infer<
  typeof updateProductResponseSchema
>;

export const updateProductErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type UpdateProductErrorResponseSchema = z.infer<
  typeof updateProductErrorResponseSchema
>;

export async function updateProductApi(
  params: UpdateProductParamsSchema,
  body: UpdateProductBodySchema,
) {
  const response = await apiClient.put<UpdateProductResponseSchema>(
    `/products/${params.productId}`,
    body,
  );
  return response.data;
}
