import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./db/helpers/generateToken";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    const authorization = cookies().get("Authorization");
    if (!authorization) {
      console.log("Authorization cookie not found");
      return NextResponse.json(
        {
          message: "Authentication Failed",
        },
        {
          status: 401,
        }
      );
    }

    const access_token = authorization.value.split(" ")[1];
    console.log("Access Token:", access_token);

    try {
      const decode = await verifyTokenJose<{ _id: string }>(access_token);
      console.log("Decoded Token:", decode);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decode._id);

      const response = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      return response;
    } catch (error) {
      console.error("Token verification failed:", error);
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
  matcher: "/api/:path*",
};
