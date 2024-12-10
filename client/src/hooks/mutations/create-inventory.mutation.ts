import { getQueryClient } from "@/app/get-query-client";
import {
  createInventoryApi,
  CreateInventoryBodySchema,
  CreateInventoryErrorResponseSchema,
  CreateInventoryResponseSchema,
} from "@/lib/apis/create-inventory.api";
import { useMutation } from "@tanstack/react-query";

export function useCreateInventoryMutation() {
  const mutationKey = ["create-inventory"] as const;
  return useMutation<
    CreateInventoryResponseSchema,
    CreateInventoryErrorResponseSchema,
    CreateInventoryBodySchema
  >({
    mutationKey,
    mutationFn: (body) => createInventoryApi(body),
    onSuccess(data) {},
  });
}
