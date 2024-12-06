import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const createProductBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  sku: z.string().min(1),
});
export type CreateProductBodySchema = z.infer<typeof createProductBodySchema>;

export const createProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  sku: z.string(),
});
export type CreateProductResponseSchema = z.infer<
  typeof createProductResponseSchema
>;

export const createProductErrorResponseSchema = z.discriminatedUnion("type", [
  validationErrorResponseSchema,
]);
export type CreateProductErrorResponseSchema = z.infer<
  typeof createProductErrorResponseSchema
>;

export async function createProductApi(body: CreateProductBodySchema) {
  const response = await apiClient.post<CreateProductResponseSchema>(
    "/products",
    body,
  );
  return response.data;
}
