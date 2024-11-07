import { z } from "zod";
import { apiClient } from "../api/client";
import { productSchema } from "../schemas/product.schema";

export const listProductsQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  name: z.string().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export const listProductsQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listProductsQueryFilterSchema);
export type ListProductsQuerySchema = z.infer<typeof listProductsQuerySchema>;

export const listProductsResponseSchema = z.object({
  items: z.array(productSchema),
  rowCount: z.number(),
});
export type ListProductsResponseSchema = z.infer<
  typeof listProductsResponseSchema
>;

export const listProductsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListProductsErrorResponseSchema = z.infer<
  typeof listProductsErrorResponseSchema
>;

export async function listProductsApi(
  query: ListProductsQuerySchema,
): Promise<ListProductsResponseSchema> {
  const response = await apiClient.get<ListProductsResponseSchema>(
    `/products`,
    query,
  );
  return response.data;
}
