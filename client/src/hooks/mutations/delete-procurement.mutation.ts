import { getQueryClient } from "@/app/get-query-client";
import {
  deleteProcurementApi,
  DeleteProcurementErrorResponseSchema,
  DeleteProcurementParamsSchema,
  DeleteProcurementResponseSchema,
} from "@/lib/apis/delete-procurment.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteProcurementMutation(
  params: DeleteProcurementParamsSchema,
) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-procurement", params] as const;

  return useMutation<
    DeleteProcurementResponseSchema,
    DeleteProcurementErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteProcurementApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["procurements"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
