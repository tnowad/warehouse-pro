import { z } from "zod";
import { shipmentSchema } from "../schemas/shipment.schema";
import { apiClient } from "../api/client";

export const getShipmentDetailsParamsSchema = z.object({
  shipmentId: z.string(),
});
export type GetShipmentDetailsParamsSchema = z.infer<
  typeof getShipmentDetailsParamsSchema
>;

export const getShipmentDetailsResponseSchema = shipmentSchema;
export type GetShipmentDetailsResponseSchema = z.infer<
  typeof getShipmentDetailsResponseSchema
>;

export const getShipmentDetailsErrorResponseSchema = z.object({
  message: z.string(),
});
export type GetShipmentDetailsErrorResponseSchema = z.infer<
  typeof getShipmentDetailsErrorResponseSchema
>;

export async function getShipmentDetailsApi(
  params: GetShipmentDetailsParamsSchema,
): Promise<GetShipmentDetailsResponseSchema> {
  const response = await apiClient.get<GetShipmentDetailsResponseSchema>(
    `/shipments/${params.shipmentId}`,
  );
  return response.data;
}
