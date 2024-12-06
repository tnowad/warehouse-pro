import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";
import { procurementItemSchema } from "../schemas/procurement-item.schema";
import { procurementSchema } from "../schemas/procurement.schema";

export const createProcurementBodySchema = procurementSchema
  .pick({
    supplierId: true,
    status: true,
    orderDate: true,
    deliveryDate: true,
  })
  .extend({
    items: z
      .array(
        procurementItemSchema.pick({
          warehouseId: true,
          productId: true,
          price: true,
          quantity: true,
        }),
      )
      .min(1),
  });

export type CreateProcurementBodySchema = z.infer<
  typeof createProcurementBodySchema
>;

export const createProcurementResponseSchema = procurementSchema;

export type CreateProcurementResponseSchema = z.infer<
  typeof createProcurementResponseSchema
>;

export const createProcurementErrorResponseSchema = z.discriminatedUnion(
  "type",
  [validationErrorResponseSchema],
);

export type CreateProcurementErrorResponseSchema = z.infer<
  typeof createProcurementErrorResponseSchema
>;

export async function createProcurementApi(body: CreateProcurementBodySchema) {
  const response = await apiClient.post<CreateProcurementResponseSchema>(
    "/procurements",
    body,
  );
  return response.data;
}
