import { getQueryClient } from "@/app/get-query-client";
import {
  deleteUserApi,
  DeleteUserParamsSchema,
  DeleteUserErrorResponseSchema,
  DeleteUserResponseSchema,
} from "@/lib/apis/delete-user.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useDeleteUserMutation(params: DeleteUserParamsSchema) {
  const queryClient = getQueryClient();
  const mutationKey = ["delete-user", params] as const;

  return useMutation<
    DeleteUserResponseSchema,
    DeleteUserErrorResponseSchema,
    void
  >({
    mutationKey,
    mutationFn: () => deleteUserApi(params),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
