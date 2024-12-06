import { useMutation } from "@tanstack/react-query";
import {
  createSupplierProductApi,
  CreateSupplierProductBodySchema,
  CreateSupplierProductErrorResponseSchema,
  CreateSupplierProductResponseSchema,
} from "@/lib/apis/create-supplier-product.api";
import { getQueryClient } from "@/app/get-query-client";
import { isAxiosError } from "axios";

export function useCreateSupplierProductMutation() {
  const queryClient = getQueryClient();

  return useMutation<
    CreateSupplierProductResponseSchema,
    CreateSupplierProductErrorResponseSchema,
    CreateSupplierProductBodySchema
  >({
    mutationKey: ["create-supplier-product"],
    mutationFn: (data) => createSupplierProductApi(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["supplier-products"],
      });
    },
    throwOnError: isAxiosError,
  });
}
