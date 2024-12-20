import {
  getUserDetailsApi,
  GetUserDetailsParamsSchema,
} from "@/lib/apis/get-user-details.api";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function createGetUserDetailsQueryOptions(
  params: GetUserDetailsParamsSchema,
) {
  const queryKey = ["get-user-details", params];
  return queryOptions({
    queryKey,
    queryFn: () => getUserDetailsApi(params),
    enabled: !!params.userId,
    throwOnError: (error) => isAxiosError(error),
  });
}
