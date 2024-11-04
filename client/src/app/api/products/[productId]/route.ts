import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update product" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete product" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get product details" });
}
