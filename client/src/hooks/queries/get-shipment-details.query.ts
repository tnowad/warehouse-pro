import {
  getShipmentDetailsApi,
  GetShipmentDetailsParamsSchema,
} from "@/lib/apis/get-shipment-details.api";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetShipmentDetailsQueryOptions(
  params: GetShipmentDetailsParamsSchema,
) {
  const queryKey = ["get-shipment-details", params];
  return queryOptions({
    queryKey,
    queryFn: () => getShipmentDetailsApi(params),
    enabled: !!params.shipmentId,
    throwOnError: (error) => isAxiosError(error),
  });
}
