import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.url.includes("api/idols")) {
    const authorization = cookies().get("Authorization");
    if (!authorization) {
      return NextResponse.json(
        {
          message: "Authentication Failed",
        },
        {
          status: 401,
        }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "api/:path*",
};
