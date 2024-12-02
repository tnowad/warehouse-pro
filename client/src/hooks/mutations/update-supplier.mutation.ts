import { getQueryClient } from "@/app/get-query-client";
import {
  updateSupplierApi,
  UpdateSupplierBodySchema,
  UpdateSupplierErrorResponseSchema,
  UpdateSupplierParamsSchema,
  UpdateSupplierResponseSchema,
} from "@/lib/apis/update-supplier.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUpdateSupplierMutation(params: UpdateSupplierParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-supplier", params] as const;

  return useMutation<
    UpdateSupplierResponseSchema,
    UpdateSupplierErrorResponseSchema,
    UpdateSupplierBodySchema
  >({
    mutationKey,
    mutationFn: (data) => updateSupplierApi(params, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
