import { getQueryClient } from "@/app/get-query-client";
import {
  deleteShipmentApi,
  DeleteShipmentErrorResponseSchema,
  DeleteShipmentParamsSchema,
  DeleteShipmentResponseSchema,
} from "@/lib/apis/delete-shipment.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteShipmentMutation(params: DeleteShipmentParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-shipment", params] as const;

  return useMutation<
    DeleteShipmentResponseSchema,
    DeleteShipmentErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteShipmentApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["shipments"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
