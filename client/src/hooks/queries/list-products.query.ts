import {
  listProductsApi,
  ListProductsErrorResponseSchema,
  ListProductsQuerySchema,
  ListProductsResponseSchema,
} from "@/lib/apis/list-products.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListProductsQueryOptions(query: ListProductsQuerySchema) {
  const queryKey = ["get-products", query] as const;
  return queryOptions<
    ListProductsResponseSchema,
    ListProductsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => listProductsApi(query),
    placeholderData: keepPreviousData,
  });
}
