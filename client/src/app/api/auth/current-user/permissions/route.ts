import { GetCurrentUserPermissionsResponseSchema } from "@/lib/apis/get-current-user-permissions.api";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({
    permissions: ["VIEW_DASHBOARD"],
  } satisfies GetCurrentUserPermissionsResponseSchema);
}
