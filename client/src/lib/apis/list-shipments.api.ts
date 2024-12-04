import { z } from "zod";
import { shipmentSchema } from "../schemas/shipment.schema";
import { apiClient } from "../api/client";

export const listShipmentsQueryFilterSchema = z.object({
  ids: z.array(z.string().uuid()).optional(),
  orderIds: z.string().uuid().array().optional(),
  status: z.string().optional(),
  carrier: z.string().optional(),
});
export type ListShipmentsQueryFilterSchema = z.infer<
  typeof listShipmentsQueryFilterSchema
>;

export const listShipmentsQuerySchema = z
  .object({
    query: z.string().optional(),
    page: z.number().optional(),
    pageSize: z.number().optional(),
    sort: z.string().optional(),
  })
  .merge(listShipmentsQueryFilterSchema);

export type ListShipmentsQuerySchema = z.infer<typeof listShipmentsQuerySchema>;

export const listShipmentsResponseSchema = z.object({
  items: z.array(shipmentSchema),
  rowCount: z.number(),
});
export type ListShipmentsResponseSchema = z.infer<
  typeof listShipmentsResponseSchema
>;

export const listShipmentsErrorResponseSchema = z.object({
  message: z.string(),
});
export type ListShipmentsErrorResponseSchema = z.infer<
  typeof listShipmentsErrorResponseSchema
>;

export async function listShipmentsApi(
  query: ListShipmentsQuerySchema,
): Promise<ListShipmentsResponseSchema> {
  const response = await apiClient.get<ListShipmentsResponseSchema>(
    "/shipments",
    query,
  );
  return response.data;
}
