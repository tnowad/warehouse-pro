import {
  getOrderDetailsApi,
  GetOrderDetailsParamsSchema,
} from "@/lib/apis/get-order-details.api";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetOrderDetailsQueryOptions(
  params: GetOrderDetailsParamsSchema,
) {
  const queryKey = ["get-order-details", params];
  return queryOptions({
    queryKey,
    queryFn: () => getOrderDetailsApi(params),
    enabled: !!params.orderId,
    throwOnError: (error) => isAxiosError(error),
  });
}
