import { NextRequest } from "next/server";
import { GetCurrentUserPermissionsResponseSchema } from "@/lib/apis/get-current-user-permissions.api";

export async function GET(request: NextRequest) {
  return Response.json({
    permissions: ["VIEW_DASHBOARD"],
  } satisfies GetCurrentUserPermissionsResponseSchema);
}
