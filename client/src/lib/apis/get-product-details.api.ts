import { z } from "zod";
import { productSchema } from "../schemas/product.schema";
import { apiClient } from "../api/client";

export const getProductDetailsParamsSchema = z.object({
  productId: z.string().uuid(),
});
export type GetProductDetailsParamsSchema = z.infer<
  typeof getProductDetailsParamsSchema
>;

export const getProductDetailsResponseSchema = productSchema;
export type GetProductDetailsResponseSchema = z.infer<
  typeof getProductDetailsResponseSchema
>;

export const getProductDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetProductDetailsErrorResponseSchema = z.infer<
  typeof getProductDetailsErrorResponseSchema
>;

export async function getProductDetailsApi(
  params: GetProductDetailsParamsSchema,
) {
  const response = await apiClient.get<GetProductDetailsResponseSchema>(
    `/products/${params.productId}`,
  );
  return response.data;
}
