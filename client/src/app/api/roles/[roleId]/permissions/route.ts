import { ListRolePermissionsResponseSchema } from "@/lib/apis/list-role-permissions.api";
import { permissions } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({
    items: permissions.map((permission) => ({
      name: permission.name,
      enable: true,
    })),
  } satisfies ListRolePermissionsResponseSchema);
}
