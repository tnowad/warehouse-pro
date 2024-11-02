import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api")) {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 180 + 20),
    );
  }

  return NextResponse.next();
}
