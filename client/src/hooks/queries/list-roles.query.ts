import {
  listRolesApi,
  ListRolesErrorResponseSchema,
  ListRolesResponseSchema,
} from "@/lib/apis/list-roles.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListRolesQueryOptions({}) {
  const queryKey = ["get-roles"] as const;
  return queryOptions<ListRolesResponseSchema, ListRolesErrorResponseSchema>({
    queryKey,
    queryFn: () => listRolesApi(),
    placeholderData: keepPreviousData,
  });
}
