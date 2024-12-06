import { getQueryClient } from "@/app/get-query-client";
import {
  createProductApi,
  CreateProductBodySchema,
  CreateProductErrorResponseSchema,
  CreateProductResponseSchema,
} from "@/lib/apis/create-product.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreateProductMutation() {
  const queryClient = getQueryClient();
  return useMutation<
    CreateProductResponseSchema,
    CreateProductErrorResponseSchema,
    CreateProductBodySchema
  >({
    mutationKey: ["create-product"],
    mutationFn: (data) => createProductApi(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
