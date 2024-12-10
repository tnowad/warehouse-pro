import {
  deleteInventoryApi,
  DeleteInventoryErrorResponseSchema,
  DeleteInventoryParamsSchema,
  DeleteInventoryResponseSchema,
} from "@/lib/apis/delete-inventory.api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteInventoryMutation(
  params: DeleteInventoryParamsSchema,
) {
  return useMutation<
    DeleteInventoryResponseSchema,
    DeleteInventoryErrorResponseSchema,
    DeleteInventoryParamsSchema
  >({
    mutationKey: ["delete-inventory"],
    mutationFn: () => deleteInventoryApi(params),
    onSuccess(data) {},
  });
}
