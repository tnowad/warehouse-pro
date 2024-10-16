import { postAuthLogin } from "@/lib/api/endpoints/post-auth-login";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token";
import {
  PostAuthLoginErrorResponseSchema,
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from "@/lib/api/schemas/post-auth-login-schema";
import { useCurrentUserActions } from "../use-current-user";

export function useLoginMutation() {
  const queryClient = useQueryClient();
  const { setAccessToken, setRefreshToken } = useTokenActions();
  const { setCurrentUser } = useCurrentUserActions();

  return useMutation<
    PostAuthLoginResponseSchema,
    PostAuthLoginErrorResponseSchema,
    PostAuthLoginRequestSchema
  >({
    mutationKey: ["login"],
    mutationFn: (data) => postAuthLogin(data),
    onSuccess(data) {
      setRefreshToken(data.tokens.refreshToken);
      setAccessToken(data.tokens.accessToken);
      setCurrentUser(data.user);
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
