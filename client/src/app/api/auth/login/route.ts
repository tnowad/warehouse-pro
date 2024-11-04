import { loginBodySchema, LoginResponseSchema } from "@/lib/apis/login.api";
import { tokensFaker, users } from "@/mocks";
import { NextRequest } from "next/server";
export async function POST(request: NextRequest) {
  const body = loginBodySchema.parse(await request.json());

  const { email, password } = body;
  const user = users.find(
    (user) => user.email === email && user.password === password,
  );

  if (!user) {
    return Response.json(
      { message: "invalid email or password" },
      { status: 401 },
    );
  }

  return Response.json({
    message: "login successful",
    tokens: tokensFaker(),
  } satisfies LoginResponseSchema);
}
