import { NextRequest } from "next/server";
import { ListProductsResponseSchema } from "@/lib/apis/list-products.api";
import { products } from "@/mocks";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const query = searchParams.get("query") || "";
  const sku = searchParams.get("sku");
  const createdAt = searchParams.get("createdAt");
  const updatedAt = searchParams.get("updatedAt");

  const allItems = products.filter((product) => {
    const matchesQuery =
      product.name.includes(query) || product.description.includes(query);
    const matchesSku = sku ? product.sku === sku : true;
    const matchesCreatedAt = createdAt ? product.createdAt === createdAt : true;
    const matchesUpdatedAt = updatedAt ? product.updatedAt === updatedAt : true;

    return matchesQuery && matchesSku && matchesCreatedAt && matchesUpdatedAt;
  });

  const items = allItems.slice((page - 1) * pageSize, page * pageSize);

  return Response.json({
    items: items,
    rowCount: allItems.length,
  } satisfies ListProductsResponseSchema);
}
