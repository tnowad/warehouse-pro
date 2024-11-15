import { GetUserDetailsResponseSchema } from "@/lib/apis/get-user-details.api";
import { roles, users } from "@/mocks";
import { NextRequest } from "next/server";

type Params = {
  userId: string;
};

export async function GET(_: NextRequest, { params }: { params: Params }) {
  const { userId } = params;
  const user = users.find((user) => user.id === userId);
  if (!user) {
    throw Response.json({ message: "User not found" }, { status: 404 });
  }

  return Response.json({
    ...user,
    roles: roles,
  } satisfies GetUserDetailsResponseSchema);
}

export async function PUT(request: NextRequest) {
  return Response.json({ message: "update user" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete user" });
}
