import { NextRequest } from "next/server";
import { ListOrdersResponseSchema } from "@/lib/apis/list-orders.api";
import { orders } from "@/mocks";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status");
  const paymentStatus = searchParams.get("paymentStatus");
  const createdAt = searchParams.get("createdAt");
  const updatedAt = searchParams.get("updatedAt");

  const allItems = orders.filter((order) => {
    const matchesQuery =
      order.id.includes(query) || order.shippingAddress.includes(query);
    const matchesStatus = status ? order.status === status : true;
    const matchesPaymentStatus = paymentStatus
      ? order.paymentStatus === paymentStatus
      : true;
    const matchesCreatedAt = createdAt ? order.createdAt === createdAt : true;
    const matchesUpdatedAt = updatedAt ? order.updatedAt === updatedAt : true;

    return (
      matchesQuery &&
      matchesStatus &&
      matchesPaymentStatus &&
      matchesCreatedAt &&
      matchesUpdatedAt
    );
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: allItems.length,
  } satisfies ListOrdersResponseSchema);
}
