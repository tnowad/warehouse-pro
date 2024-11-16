import { getQueryClient } from "@/app/get-query-client";
import {
  deleteRoleApi,
  DeleteRoleParamsSchema,
  DeleteRoleErrorResponseSchema,
  DeleteRoleResponseSchema,
} from "@/lib/apis/delete-role.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteRoleMutation(params: DeleteRoleParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-role", params] as const;

  return useMutation<
    DeleteRoleResponseSchema,
    DeleteRoleErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteRoleApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
