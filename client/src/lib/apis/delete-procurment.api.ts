import { z } from "zod";
import { apiClient } from "../api/client";
import { validationErrorResponseSchema } from "../api/schemas/validation-error-response-schema";

export const deleteProcurementParamsSchema = z.object({
  procurementId: z.string().uuid(),
});
export type DeleteProcurementParamsSchema = z.infer<
  typeof deleteProcurementParamsSchema
>;

export const deleteProcurementResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
});
export type DeleteProcurementResponseSchema = z.infer<
  typeof deleteProcurementResponseSchema
>;

export const deleteProcurementErrorResponseSchema = z.discriminatedUnion(
  "type",
  [validationErrorResponseSchema],
);
export type DeleteProcurementErrorResponseSchema = z.infer<
  typeof deleteProcurementErrorResponseSchema
>;

export async function deleteProcurementApi(
  params: DeleteProcurementParamsSchema,
): Promise<DeleteProcurementResponseSchema> {
  const response = await apiClient.delete<DeleteProcurementResponseSchema>(
    `/procurements/${params.procurementId}`,
  );
  return response.data;
}
