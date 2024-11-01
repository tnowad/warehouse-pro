import {
  getCurrentUserPermissionsApi,
  GetCurrentUserPermissionsErrorResponseSchema,
  GetCurrentUserPermissionsResponseSchema,
} from "@/lib/apis/get-current-user-permissions.api";
import { queryOptions } from "@tanstack/react-query";

export const getCurrentUserPermissionsQueryOptions = queryOptions<
  GetCurrentUserPermissionsResponseSchema,
  GetCurrentUserPermissionsErrorResponseSchema
>({
  queryKey: ["current-user-permissions"],
  queryFn: () => getCurrentUserPermissionsApi(),
});
