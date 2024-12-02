import { z } from "zod";
import { supplierSchema } from "../schemas/supplier.schema";
import { apiClient } from "../api/client";

export const listSuppliersQueryFilterSchema = z.object({
  ids: z.array(z.string()).optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  contactNumber: z.string().optional(),
  createdAt: z.string().date().optional(),
  updatedAt: z.string().date().optional(),
});

export const listSuppliersQuerySchema = z
  .object({
    query: z.string().optional(),
    sort: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
  })
  .merge(listSuppliersQueryFilterSchema);
export type ListSuppliersQuerySchema = z.infer<typeof listSuppliersQuerySchema>;

export const listSuppliersResponseSchema = z.object({
  items: z.array(supplierSchema),
  rowCount: z.number(),
});
export type ListSuppliersResponseSchema = z.infer<
  typeof listSuppliersResponseSchema
>;

export const listSuppliersErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListSuppliersErrorResponseSchema = z.infer<
  typeof listSuppliersErrorResponseSchema
>;

export async function listSuppliersApi(
  query: ListSuppliersQuerySchema,
): Promise<ListSuppliersResponseSchema> {
  const response = await apiClient.get<ListSuppliersResponseSchema>(
    `/suppliers`,
    query,
  );
  return response.data;
}
