import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  listShipmentItemsApi,
  ListShipmentItemsParamsSchema,
} from "@/lib/apis/list-shipment-items.api";

export function createListShipmentItemsQueryOptions(
  params: ListShipmentItemsParamsSchema,
) {
  const queryKey = ["shipment-items", params];
  return queryOptions({
    queryKey,
    queryFn: () => listShipmentItemsApi(params),
    enabled: !!params.shipmentId,
    throwOnError: (error) => isAxiosError(error),
  });
}
