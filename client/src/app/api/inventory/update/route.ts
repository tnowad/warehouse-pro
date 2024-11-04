import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update inventory" });
}
