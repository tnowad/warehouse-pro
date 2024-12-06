import {
  createProcurementApi,
  CreateProcurementBodySchema,
  CreateProcurementErrorResponseSchema,
  CreateProcurementResponseSchema,
} from "@/lib/apis/create-procurement.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreateProcurementMutation() {
  return useMutation<
    CreateProcurementResponseSchema,
    CreateProcurementErrorResponseSchema,
    CreateProcurementBodySchema
  >({
    mutationKey: ["create-procurement"],
    mutationFn: (body) => createProcurementApi(body),
    onSuccess(data) {
      console.log(data);
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
