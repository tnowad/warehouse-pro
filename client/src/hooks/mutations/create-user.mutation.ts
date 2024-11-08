import { getQueryClient } from "@/app/get-query-client";
import {
  createUserApi,
  CreateUserBodySchema,
  CreateUserErrorResponseSchema,
  CreateUserResponseSchema,
} from "@/lib/apis/create-user.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useCreateUserMutation() {
  const queryClient = getQueryClient();
  return useMutation<
    CreateUserResponseSchema,
    CreateUserErrorResponseSchema,
    CreateUserBodySchema
  >({
    mutationKey: ["create-user"],
    mutationFn: (data) => createUserApi(data),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
