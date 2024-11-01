import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update role" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete role" });
}
