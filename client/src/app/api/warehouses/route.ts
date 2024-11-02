import { ListWarehousesResponseSchema } from "@/lib/apis/list-warehouses.api";
import { warehouses } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const items = warehouses.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: warehouses.length,
  } satisfies ListWarehousesResponseSchema);
}
