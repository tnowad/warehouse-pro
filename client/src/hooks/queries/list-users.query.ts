import {
  listUsersApi,
  ListUsersErrorResponseSchema,
  ListUsersQuerySchema,
  ListUsersResponseSchema,
} from "@/lib/apis/list-users.api";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";

export function createListUsersQueryOptions(query: ListUsersQuerySchema) {
  const queryKey = ["get-users", query] as const;
  return queryOptions<ListUsersResponseSchema, ListUsersErrorResponseSchema>({
    queryKey,
    queryFn: () => listUsersApi(query),
    placeholderData: keepPreviousData,
  });
}
