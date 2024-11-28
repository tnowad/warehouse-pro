import { getQueryClient } from "@/app/get-query-client";
import {
  deleteOrderApi,
  DeleteOrderParamsSchema,
  DeleteOrderErrorResponseSchema,
  DeleteOrderResponseSchema,
} from "@/lib/apis/delete-order.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteOrderMutation(params: DeleteOrderParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-order", params] as const;

  return useMutation<
    DeleteOrderResponseSchema,
    DeleteOrderErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteOrderApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
