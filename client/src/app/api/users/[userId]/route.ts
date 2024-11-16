import { GetUserDetailsResponseSchema } from "@/lib/apis/get-user-details.api";
import { roles, userFaker, users } from "@/mocks";
import { NextRequest } from "next/server";

type Params = {
  userId: string;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  return Response.json({
    ...userFaker(),
    roles: roles,
  } satisfies GetUserDetailsResponseSchema);
}

export async function PUT(request: NextRequest) {
  return Response.json({ message: "update user" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete user" });
}
