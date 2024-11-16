import { useMutation } from "@tanstack/react-query";
import {
  updateRoleApi,
  UpdateRoleBodySchema,
  UpdateRoleErrorResponseSchema,
  UpdateRoleResponseSchema,
  UpdateRoleParamsSchema,
} from "@/lib/apis/update-role.api";
import { getQueryClient } from "@/app/get-query-client";
import { isAxiosError } from "axios";

export function useUpdateRoleMutation(params: UpdateRoleParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-role", params] as const;

  return useMutation<
    UpdateRoleResponseSchema,
    UpdateRoleErrorResponseSchema,
    UpdateRoleBodySchema
  >({
    mutationKey,
    mutationFn: (data) => updateRoleApi(params, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
