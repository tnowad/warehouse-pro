import { z } from "zod";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { apiClient } from "../api/client";

export const deleteProductParamsSchema = z.object({
  productId: z.string().uuid(),
});
export type DeleteProductParamsSchema = z.infer<
  typeof deleteProductParamsSchema
>;

export const deleteProductResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteProductResponseSchema = z.infer<
  typeof deleteProductResponseSchema
>;

export const deleteProductErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type DeleteProductErrorResponseSchema = z.infer<
  typeof deleteProductErrorResponseSchema
>;

export async function deleteProductApi(
  params: DeleteProductParamsSchema,
): Promise<DeleteProductResponseSchema> {
  const response = await apiClient.delete<DeleteProductResponseSchema>(
    `/products/${params.productId}`,
  );
  return response.data;
}
