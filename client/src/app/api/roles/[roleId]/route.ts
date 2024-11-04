import { GetRoleDetailsResponseSchema } from "@/lib/apis/get-role-details.api";
import { roles } from "@/mocks";
import { NextRequest } from "next/server";

type Params = Promise<{ roleId: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { roleId } = await params;

  const role = roles.find((role) => role.id === roleId);
  if (!role) {
    return Response.json(
      {
        message: `Role with id ${roleId} not found`,
      },
      { status: 404 },
    );
  }

  return Response.json({
    ...role,
  } satisfies GetRoleDetailsResponseSchema);
}
