import { z } from "zod";
import { supplierProductSchema } from "../schemas/supplier-product.schema";
import { apiClient } from "../api/client";
import { queryOptions } from "@tanstack/react-query";

export const listSupplierProductsQueryFilterSchema = z.object({
  supplierIds: z.array(z.string().uuid()).optional(),
  productIds: z.array(z.string().uuid()).optional(),
  availabilityStatus: z.string().optional(),
});
export type ListSupplierProductsQueryFilterSchema = z.infer<
  typeof listSupplierProductsQueryFilterSchema
>;

export const listSupplierProductsQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listSupplierProductsQueryFilterSchema);

export type ListSupplierProductsQuerySchema = z.infer<
  typeof listSupplierProductsQuerySchema
>;

export const listSupplierProductsResponseSchema = z.object({
  items: z.array(supplierProductSchema),
  rowCount: z.number(),
});
export type ListSupplierProductsResponseSchema = z.infer<
  typeof listSupplierProductsResponseSchema
>;

export const listSupplierProductsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListSupplierProductsErrorResponseSchema = z.infer<
  typeof listSupplierProductsErrorResponseSchema
>;

export async function listSupplierProductsApi(
  query: ListSupplierProductsQuerySchema,
): Promise<ListSupplierProductsResponseSchema> {
  const response = await apiClient.get<ListSupplierProductsResponseSchema>(
    "/supplier-products",
    query,
  );
  return response.data;
}
