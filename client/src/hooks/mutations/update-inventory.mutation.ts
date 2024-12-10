import {
  updateInventoryApi,
  UpdateInventoryBodySchema,
  UpdateInventoryErrorResponseSchema,
  UpdateInventoryParamsSchema,
  UpdateInventoryResponseSchema,
} from "@/lib/apis/update-inventory.api";
import { useMutation } from "@tanstack/react-query";

export function useUpdateInventoryMutation(
  params: UpdateInventoryParamsSchema,
) {
  const mutationKey = ["update-inventory"] as const;
  return useMutation<
    UpdateInventoryResponseSchema,
    UpdateInventoryErrorResponseSchema,
    UpdateInventoryBodySchema
  >({
    mutationKey,
    mutationFn: (body) => updateInventoryApi(params, body),
    onSuccess(data) {
      console.log(data);
    },
  });
}
