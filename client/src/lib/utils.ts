import { type ClassValue, clsx } from "clsx";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { setCookie } from "cookies-next";
import { COOKIE_KEY_ACCESS_TOKEN } from "@/constants";
import { jwtDecode } from "jwt-decode";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapFieldErrorToFormError<T extends FieldValues>(
  setError: UseFormSetError<T>,
  errors: Record<string, string[]>,
) {
  for (const [field, messages] of Object.entries(errors)) {
    setError(field as unknown as Path<T>, {
      message: messages[0],
    });
  }
}

export const getEndpointQueryKey = <T, R extends string>(
  params: T,
  endpoint: R,
) => [endpoint, ...(params ? [params] : [])] as const;

export const setAccessToken = (token: string) => {
  setCookie(COOKIE_KEY_ACCESS_TOKEN, token, {});
};
