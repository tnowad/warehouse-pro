import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update warehouse" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete warehouse" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get warehouse details" });
}
