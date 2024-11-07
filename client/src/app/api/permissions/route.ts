import { ListPermissionsResponseSchema } from "@/lib/apis/list-permissions.api";
import { permissions } from "@/mocks";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";
  const name = searchParams.get("name");
  const description = searchParams.get("description");

  const allItems = permissions.filter((permission) => {
    const matchesQuery =
      permission.name.includes(query) || permission.description.includes(query);
    const matchesName = name ? permission.name.includes(name) : true;
    const matchesDescription = description
      ? permission.description.includes(description)
      : true;

    return matchesQuery && matchesName && matchesDescription;
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: allItems.length,
  } satisfies ListPermissionsResponseSchema);
}
