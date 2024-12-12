import { z } from "zod";
import { shipmentItemSchema } from "../schemas/shipment-item.schema";
import { apiClient } from "../api/client";

export const listShipmentItemsParamsSchema = z.object({
  shipmentId: z.string().uuid(),
});
export type ListShipmentItemsParamsSchema = z.infer<
  typeof listShipmentItemsParamsSchema
>;
export const listShipmentItemsResponseSchema = z.object({
  items: z.array(shipmentItemSchema),
  rowCount: z.number(),
  pageSize: z.number(),
  page: z.number(),
  pageCount: z.number(),
});
export type ListShipmentItemsResponseSchema = z.infer<
  typeof listShipmentItemsResponseSchema
>;
export const listShipmentItemsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListShipmentItemsErrorResponseSchema = z.infer<
  typeof listShipmentItemsErrorResponseSchema
>;

export async function listShipmentItemsApi(
  params: ListShipmentItemsParamsSchema,
) {
  const response = await apiClient.get<ListShipmentItemsResponseSchema>(
    `/shipments/${params.shipmentId}/items`,
  );
  return response.data;
}
