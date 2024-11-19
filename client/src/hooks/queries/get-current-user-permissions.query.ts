import {
  getCurrentUserPermissionsApi,
  GetCurrentUserPermissionsErrorResponseSchema,
  GetCurrentUserPermissionsResponseSchema,
} from "@/lib/apis/get-current-user-permissions.api";
import { queryOptions } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export const getCurrentUserPermissionsQueryOptions = queryOptions<
  GetCurrentUserPermissionsResponseSchema,
  GetCurrentUserPermissionsErrorResponseSchema
>({
  queryKey: ["current-user-permissions"],
  queryFn: () => getCurrentUserPermissionsApi(),
  throwOnError: (error) => isAxiosError(error),
});
