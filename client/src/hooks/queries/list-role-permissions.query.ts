import {
  listRolePermissionsApi,
  ListRolePermissionsParamsSchema,
} from "@/lib/apis/list-role-permissions.api";

export function createListRolePermissionsQuery(
  params: ListRolePermissionsParamsSchema,
) {
  const queryKey = ["listRolePermissions", params] as const;
  return {
    queryKey,
    queryFn: () => listRolePermissionsApi(params),
  };
}
