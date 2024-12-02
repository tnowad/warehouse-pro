import {
  listSupplierProductsApi,
  ListSupplierProductsQuerySchema,
} from "@/lib/apis/list-supplier-products.api";
import { queryOptions } from "@tanstack/react-query";

export function createListSupplierProductsQueryOptions(
  query: ListSupplierProductsQuerySchema,
) {
  const queryKey = ["supplier-products", query] as const;
  return queryOptions({
    queryKey,
    queryFn: () => listSupplierProductsApi(query),
  });
}
