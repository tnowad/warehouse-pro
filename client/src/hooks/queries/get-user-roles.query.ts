import {
  getUserRolesApi,
  GetUserRolesParamsSchema,
} from "@/lib/apis/get-user-roles.api";
import { queryOptions } from "@tanstack/react-query";

export function createGetUserRolesQueryOptions(
  params: GetUserRolesParamsSchema,
) {
  const queryKey = ["get-user-roles", params];
  return queryOptions({
    queryKey,
    queryFn: () => getUserRolesApi(params),
    enabled: !!params.userId,
  });
}
