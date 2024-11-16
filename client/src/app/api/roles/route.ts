import {
  createRoleBodySchema,
  CreateRoleResponseSchema,
} from "@/lib/apis/create-role.api";
import { ListRolesResponseSchema } from "@/lib/apis/list-roles.api";
import { roleFaker, roles } from "@/mocks";
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
    pageCount: Math.ceil(allItems.length / pageSize),
    page,
  } satisfies ListRolesResponseSchema);
}

export async function POST(request: NextRequest) {
  const body = createRoleBodySchema.parse(await request.json());
  return Response.json({
    ...roleFaker(),
  } satisfies CreateRoleResponseSchema);
}
