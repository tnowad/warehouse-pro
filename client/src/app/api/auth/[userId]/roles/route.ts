import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  return Response.json({ message: "assign role" });
}
export async function GET(request: NextRequest) {
  return Response.json({ message: "get user roles" });
}
