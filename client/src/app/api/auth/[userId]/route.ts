import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  return Response.json({ message: "get user details" });
}
export async function PUT(request: NextRequest) {
  return Response.json({ message: "update user" });
}
export async function DELETE(request: NextRequest) {
  return Response.json({ message: "delete user" });
}
