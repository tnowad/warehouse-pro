import {
  getProductDetailsApi,
  GetProductDetailsParamsSchema,
} from "@/lib/apis/get-product-details.api";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetProductDetailsQueryOptions(
  params: GetProductDetailsParamsSchema,
) {
  const queryKey = ["get-product-details", params];
  return queryOptions({
    queryKey,
    queryFn: () => getProductDetailsApi(params),
    enabled: !!params.productId,
    throwOnError: (error) => isAxiosError(error),
  });
}
