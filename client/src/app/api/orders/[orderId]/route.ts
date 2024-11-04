import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update order" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "cancel order" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get order details" });
}
