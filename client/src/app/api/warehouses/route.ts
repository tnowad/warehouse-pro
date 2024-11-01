import { ListWarehousesResponseSchema } from "@/lib/apis/list-warehouses.api";
import { WarehouseSchema } from "@/lib/schemas/warehouse.schema";
import { warehouses } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = searchParams.get("cursor");
  const limit = Number(searchParams.get("limit")) || 10;
  const currentCursorIndex = cursor
    ? warehouses.findIndex((w) => w.id === cursor)
    : 0;

  const items: WarehouseSchema[] = warehouses.slice(
    currentCursorIndex,
    currentCursorIndex + limit,
  );
  const nextCursor: string = warehouses[currentCursorIndex + limit]?.id;
  const prevCursor: string = warehouses[currentCursorIndex - limit]?.id;

  return Response.json({
    items,
    nextCursor,
    prevCursor,
  } satisfies ListWarehousesResponseSchema);
}
