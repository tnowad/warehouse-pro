import { getQueryClient } from "@/app/get-query-client";
import {
  updateProductApi,
  UpdateProductBodySchema,
  UpdateProductErrorResponseSchema,
  UpdateProductParamsSchema,
  UpdateProductResponseSchema,
} from "@/lib/apis/update-product.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUpdateProductMutation(params: UpdateProductParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-product", params] as const;

  return useMutation<
    UpdateProductResponseSchema,
    UpdateProductErrorResponseSchema,
    UpdateProductBodySchema
  >({
    mutationKey,
    mutationFn: (data) => updateProductApi(params, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
