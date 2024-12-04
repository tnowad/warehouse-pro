import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { returnSchema } from "../schemas/return.schema";
import { unauthorizedErrorResponseSchema } from "../api/schemas/unauthorized-error-response-schema";

export const createBulkReturnBodySchema = returnSchema
  .pick({ reason: true, status: true, returnDate: true })
  .extend({
    orderItemIds: z.array(z.string().min(1)),
  });
export type CreateBulkReturnBodySchema = z.infer<
  typeof createBulkReturnBodySchema
>;

export const createBulkReturnResponseSchema = z.object({
  message: z.string(),
});
export type CreateBulkReturnResponseSchema = z.infer<
  typeof createBulkReturnResponseSchema
>;

export const createBulkReturnErrorResponseSchema = z.discriminatedUnion(
  "type",
  [validationErrorResponseSchema, unauthorizedErrorResponseSchema],
);
export type CreateBulkReturnErrorResponseSchema = z.infer<
  typeof createBulkReturnErrorResponseSchema
>;

export async function createBulkReturnApi(body: CreateBulkReturnBodySchema) {
  const response = await apiClient.post<CreateBulkReturnResponseSchema>(
    "/returns/bulk",
    body,
  );
  return response.data;
}
