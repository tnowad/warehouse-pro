import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  getOrderItemsApi,
  GetOrderItemsParamsSchema,
} from "@/lib/apis/get-order-items.api";

export function createGetOrderItemsQueryOptions(
  params: GetOrderItemsParamsSchema,
) {
  const queryKey = ["get-order-items", params];
  return queryOptions({
    queryKey,
    queryFn: () => getOrderItemsApi(params),
    enabled: !!params.orderId,
    throwOnError: (error) => isAxiosError(error),
  });
}
