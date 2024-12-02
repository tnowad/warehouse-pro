import {
  getSupplierDetailsApi,
  GetSupplierDetailsParamsSchema,
} from "@/lib/apis/get-supplier-details.api";
import { queryOptions } from "@tanstack/react-query";

export function createGetSupplierDetailsQuery(
  params: GetSupplierDetailsParamsSchema,
) {
  const queryKey = ["get-supplier-details", params] as const;
  return queryOptions({
    queryKey,
    queryFn: () => getSupplierDetailsApi(params),
  });
}
