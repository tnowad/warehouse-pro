import {
  loginApi,
  LoginBodySchema,
  LoginErrorResponseSchema,
  LoginResponseSchema,
} from "@/lib/apis/login.api";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useLoginMutation() {
  return useMutation<
    LoginResponseSchema,
    LoginErrorResponseSchema,
    LoginBodySchema
  >({
    mutationKey: ["login"],
    mutationFn: (body) => loginApi(body),
    onSuccess(data) {
      console.log(data);
    },
    throwOnError: (error) => isAxiosError(error),
  });
}
