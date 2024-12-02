import { getQueryClient } from "@/app/get-query-client";
import {
  createSupplierApi,
  CreateSupplierBodySchema,
  CreateSupplierErrorResponseSchema,
} from "@/lib/apis/create-supplier.api";
import { useMutation } from "@tanstack/react-query";

export function useCreateSupplierMutation() {
  const queryClient = getQueryClient();
  const mutationKey = ["create-supplier"] as const;
  return useMutation<
    CreateSupplierBodySchema,
    CreateSupplierErrorResponseSchema,
    CreateSupplierBodySchema
  >({
    mutationKey,
    mutationFn: (data) => createSupplierApi(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
  });
}
