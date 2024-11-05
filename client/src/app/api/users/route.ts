import { NextRequest } from "next/server";
import { ListUsersResponseSchema } from "@/lib/apis/list-users.api";
import { users } from "@/mocks";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const createdAt = searchParams.get("createdAt");
  const updatedAt = searchParams.get("updatedAt");

  const allItems = users.filter((user) => {
    const matchesQuery =
      user.name.includes(query) || user.email.includes(query);
    const matchesName = name ? user.name.includes(name) : true;
    const matchesEmail = email ? user.email.includes(email) : true;
    const matchesCreatedAt = createdAt ? user.createdAt === createdAt : true;
    const matchesUpdatedAt = updatedAt ? user.updatedAt === updatedAt : true;

    return (
      matchesQuery &&
      matchesName &&
      matchesEmail &&
      matchesCreatedAt &&
      matchesUpdatedAt
    );
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: allItems.length,
  } satisfies ListUsersResponseSchema);
}
