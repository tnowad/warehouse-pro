import {
  createBulkReturnApi,
  CreateBulkReturnBodySchema,
  CreateBulkReturnErrorResponseSchema,
  CreateBulkReturnResponseSchema,
} from "@/lib/apis/create-bulk-return.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateBulkReturnMutation() {
  const mutationKey = ["create-bulk-return"];
  const queryClient = useQueryClient();
  return useMutation<
    CreateBulkReturnResponseSchema,
    CreateBulkReturnErrorResponseSchema,
    CreateBulkReturnBodySchema
  >({
    mutationKey,
    mutationFn: (body) => createBulkReturnApi(body),
    onSuccess() {
      queryClient.invalidateQueries({
        predicate: (query) => {
          return (
            query.queryKey[0] === "returns" ||
            query.queryKey[0] === "order-items"
          );
        },
      });
    },
  });
}
