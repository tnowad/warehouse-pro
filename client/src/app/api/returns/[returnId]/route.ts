import { NextRequest } from "next/server";
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update return status" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get return details" });
}
