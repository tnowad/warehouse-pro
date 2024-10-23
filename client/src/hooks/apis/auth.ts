import { postAuthLogin } from "@/lib/api/endpoints/post-auth-login";
import {
  useMutation,
  usePrefetchQuery,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useTokenActions } from "../use-token";
import {
  PostAuthLoginErrorResponseSchema,
  PostAuthLoginRequestSchema,
  PostAuthLoginResponseSchema,
} from "@/lib/api/schemas/post-auth-login-schema";
import { useCurrentUserActions } from "../use-current-user";
import { getCurrentUser } from "@/lib/api/endpoints/get-current-user";
import {
  GetCurrentUserErrorResponseSchema,
  GetCurrentUserRequestSchema,
  GetCurrentUserResponseSchema,
} from "@/lib/api/schemas/get-current-user-schema";
import Cookies from "js-cookie";

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
        queryKey: ["current-user"],
      });
    },
    throwOnError: (error) => isAxiosError(error),
  });
}

export function useGetCurrentUserQuery() {
  const queryKey = ["current-user"];

  return useQuery<
    GetCurrentUserRequestSchema,
    GetCurrentUserErrorResponseSchema,
    GetCurrentUserResponseSchema,
    typeof queryKey
  >({
    queryKey,
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
  });
}

export function useGetCurrentUserSuspenseQuery() {
  const queryKey = ["current-user"];

  return useSuspenseQuery<
    GetCurrentUserRequestSchema,
    GetCurrentUserErrorResponseSchema,
    GetCurrentUserResponseSchema,
    typeof queryKey
  >({
    queryKey,
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export function useGetCurrentUserPrefetchQuery() {
  const queryKey = ["current-user"];

  return usePrefetchQuery<
    GetCurrentUserRequestSchema,
    GetCurrentUserErrorResponseSchema,
    GetCurrentUserResponseSchema,
    typeof queryKey
  >({
    queryKey,
    queryFn: () => getCurrentUser(),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
