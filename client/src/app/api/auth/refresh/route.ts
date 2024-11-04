import {
  refreshTokenBodySchema,
  RefreshTokenResponseSchema,
} from "@/lib/apis/refresh-token.api";
import { tokensFaker } from "@/mocks";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { refreshToken } = refreshTokenBodySchema.parse(await request.json());

  console.log(refreshToken);

  const { accessToken } = tokensFaker();

  return Response.json({ accessToken } satisfies RefreshTokenResponseSchema);
}
