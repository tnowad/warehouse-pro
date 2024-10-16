import { postAuthLogin } from "@/lib/api/endpoints/post-auth-login";
import {
  PostAuthLoginErrorResponseSchema,
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from "@/lib/api/schemas/post-auth-login-schema";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useLoginMutation() {
  return useMutation<
    PostAuthLoginResponseSchema,
    PostAuthLoginErrorResponseSchema,
    PostAuthLoginRequestSchema
  >({
    mutationKey: ["login"],
    mutationFn: (data) => postAuthLogin(data),
    onSuccess(data) {
      console.log(data);
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
