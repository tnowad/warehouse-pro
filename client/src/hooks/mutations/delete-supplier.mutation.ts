import { getQueryClient } from "@/app/get-query-client";
import {
  deleteSupplierApi,
  DeleteSupplierParamsSchema,
  DeleteSupplierErrorResponseSchema,
  DeleteSupplierResponseSchema,
} from "@/lib/apis/delete-supplier.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteSupplierMutation(params: DeleteSupplierParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-supplier", params] as const;

  return useMutation<
    DeleteSupplierResponseSchema,
    DeleteSupplierErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteSupplierApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["suppliers"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
