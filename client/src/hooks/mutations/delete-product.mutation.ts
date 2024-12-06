import { getQueryClient } from "@/app/get-query-client";
import {
  deleteProductApi,
  DeleteProductErrorResponseSchema,
  DeleteProductParamsSchema,
  DeleteProductResponseSchema,
} from "@/lib/apis/delete-product.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteProductMutation(params: DeleteProductParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-product", params] as const;

  return useMutation<
    DeleteProductResponseSchema,
    DeleteProductErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteProductApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
