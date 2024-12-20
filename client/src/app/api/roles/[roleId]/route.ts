import { DeleteRoleResponseSchema } from "@/lib/apis/delete-role.api";
import { GetRoleDetailsResponseSchema } from "@/lib/apis/get-role-details.api";
import { updateUserBodySchema } from "@/lib/apis/update-user.api";
import { permissions, roleFaker } from "@/mocks";
import { NextRequest } from "next/server";

type Params = Promise<{ roleId: string }>;

export async function GET(_: NextRequest, { params }: { params: Params }) {
  console.log(params);
  return Response.json({
    ...roleFaker(),
    permissions: permissions,
  } satisfies GetRoleDetailsResponseSchema);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Params },
) {
  const { roleId } = await params;
  const body = updateUserBodySchema.parse(await request.json());

  return Response.json({
    ...roleFaker(),
    id: roleId,
    ...body,
    permissions,
  } satisfies GetRoleDetailsResponseSchema);
}

export async function DELETE(_: NextRequest, { params }: { params: Params }) {
  const { roleId } = await params;
  return Response.json({
    id: roleId,
    message: "Role deleted successfully",
  } satisfies DeleteRoleResponseSchema);
}
