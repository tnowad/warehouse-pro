import {
  getRoleDetailsApi,
  GetRoleDetailsErrorResponseSchema,
  GetRoleDetailsParamsSchema,
  GetRoleDetailsResponseSchema,
} from "@/lib/apis/get-role-details.api";
import { queryOptions } from "@tanstack/react-query";

export function createGetRoleDetailsQueryOptions(
  params: GetRoleDetailsParamsSchema,
) {
  const queryKey = ["get-role-details", params] as const;
  return queryOptions<
    GetRoleDetailsResponseSchema,
    GetRoleDetailsErrorResponseSchema
  >({
    queryKey,
    queryFn: () => getRoleDetailsApi(params),
  });
}
