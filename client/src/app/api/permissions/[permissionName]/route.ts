import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update permission" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete permission" });
}
