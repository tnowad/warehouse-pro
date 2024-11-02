import { ListWarehousesResponseSchema } from "@/lib/apis/list-warehouses.api";
import { warehouses } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  return Response.json({
    items: warehouses,
  } satisfies ListWarehousesResponseSchema);
}
