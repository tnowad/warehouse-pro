import { GetWarehouseDetailsResponseSchema } from "@/lib/apis/get-warehouse-details.api";
import { warehouses } from "@/mocks";

type Params = Promise<{
  warehouseId: string;
}>;

export async function GET(
  _request: NextRequest,
  { params }: { params: Params },
) {
  const { warehouseId } = await params;

  const warehouse = warehouses.find(
    (warehouse) => warehouse.id === warehouseId,
  );

  if (!warehouse) {
    return Response.json(
      {
        message: `Warehouse with id ${warehouseId} not found`,
      },
      { status: 404 },
    );
  }

  return Response.json({
    ...warehouse,
  } satisfies GetWarehouseDetailsResponseSchema);
}

import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update warehouse" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete warehouse" });
}
