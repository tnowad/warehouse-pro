import { useMutation } from "@tanstack/react-query";
import {
  createRoleApi,
  CreateRoleBodySchema,
  CreateRoleErrorResponseSchema,
  CreateRoleResponseSchema,
} from "@/lib/apis/create-role.api";
import { getQueryClient } from "@/app/get-query-client";
import { isAxiosError } from "axios";

export function useCreateRoleMutation() {
  const queryClient = getQueryClient();
  return useMutation<
    CreateRoleResponseSchema,
    CreateRoleErrorResponseSchema,
    CreateRoleBodySchema
  >({
    mutationKey: ["create-role"],
    mutationFn: (data) => createRoleApi(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
    },
    throwOnError: isAxiosError,
  });
}
