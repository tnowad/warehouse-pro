import { getQueryClient } from "@/app/get-query-client";
import {
  updateOrderApi,
  UpdateOrderBodySchema,
  UpdateOrderErrorResponseSchema,
  UpdateOrderParamsSchema,
  UpdateOrderResponseSchema,
} from "@/lib/apis/update-order.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUpdateOrderMutation(params: UpdateOrderParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-order", params] as const;
  return useMutation<
    UpdateOrderResponseSchema,
    UpdateOrderErrorResponseSchema,
    UpdateOrderBodySchema
  >({
    mutationKey,
    mutationFn: (data) => updateOrderApi(params, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
