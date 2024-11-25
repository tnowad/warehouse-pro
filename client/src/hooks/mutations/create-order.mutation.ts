import {
  createOrderApi,
  CreateOrderBodySchema,
  CreateOrderErrorResponseSchema,
  CreateOrderResponseSchema,
} from "@/lib/apis/create-order.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreateOrderMutation() {
  return useMutation<
    CreateOrderResponseSchema,
    CreateOrderErrorResponseSchema,
    CreateOrderBodySchema
  >({
    mutationKey: ["create-order"],
    mutationFn: (body) => createOrderApi(body),
    onSuccess(data) {
      console.log(data);
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
