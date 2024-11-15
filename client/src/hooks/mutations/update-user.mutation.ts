import { getQueryClient } from "@/app/get-query-client";
import {
  updateUserApi,
  UpdateUserBodySchema,
  UpdateUserErrorResponseSchema,
  UpdateUserParamsSchema,
  UpdateUserResponseSchema,
} from "@/lib/apis/update-user.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUpdateUserMutation(params: UpdateUserParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["update-user", params] as const;
  return useMutation<
    UpdateUserResponseSchema,
    UpdateUserErrorResponseSchema,
    UpdateUserBodySchema
  >({
    mutationKey,
    mutationFn: (data) => updateUserApi(params, data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
