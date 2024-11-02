import { ListWarehousesResponseSchema } from "@/lib/apis/list-warehouses.api";
import { warehouses } from "@/mocks";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";
  const name = searchParams.get("name");
  const location = searchParams.get("location");
  const capacity = searchParams.get("capacity")
    ? Number(searchParams.get("capacity"))
    : undefined;
  const createdAt = searchParams.get("createdAt");
  const updatedAt = searchParams.get("updatedAt");

  const allItems = warehouses.filter((warehouse) => {
    const matchesQuery =
      warehouse.name.includes(query) || warehouse.location.includes(query);
    const matchesName = name ? warehouse.name.includes(name) : true;
    const matchesLocation = location
      ? warehouse.location.includes(location)
      : true;
    const matchesCapacity = capacity ? warehouse.capacity === capacity : true;
    const matchesCreatedAt = createdAt
      ? warehouse.createdAt === createdAt
      : true;
    const matchesUpdatedAt = updatedAt
      ? warehouse.updatedAt === updatedAt
      : true;

    return (
      matchesQuery &&
      matchesName &&
      matchesLocation &&
      matchesCapacity &&
      matchesCreatedAt &&
      matchesUpdatedAt
    );
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: allItems.length,
  } satisfies ListWarehousesResponseSchema);
}
