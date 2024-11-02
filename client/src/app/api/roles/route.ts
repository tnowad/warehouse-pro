import { ListRolesResponseSchema } from "@/lib/apis/list-roles.api";
import { roles } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";

  const allItems = roles.filter((role) => {
    return role.name.includes(query);
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items,
    rowCount: allItems.length,
  } satisfies ListRolesResponseSchema);
}
