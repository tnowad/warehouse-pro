import { z } from "zod";
import { procurementSchema } from "../schemas/procurement.schema";
import { apiClient } from "../api/client";

export const getProcurementDetailsParamsSchema = z.object({
  procurementId: z.string().uuid(),
});
export type GetProcurementDetailsParamsSchema = z.infer<
  typeof getProcurementDetailsParamsSchema
>;

export const getProcurementDetailsResponseSchema = procurementSchema;

export type GetProcurementDetailsResponseSchema = z.infer<
  typeof getProcurementDetailsResponseSchema
>;

export const getProcurementDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetProcurementDetailsErrorResponseSchema = z.infer<
  typeof getProcurementDetailsErrorResponseSchema
>;

export async function getProcurementDetailsApi(
  params: GetProcurementDetailsParamsSchema,
) {
  const response = await apiClient.get<GetProcurementDetailsResponseSchema>(
    `/procurements/${params.procurementId}`,
  );
  return response.data;
}
