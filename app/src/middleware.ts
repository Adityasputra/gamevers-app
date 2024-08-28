import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { verifyTokenJose } from "./db/helpers/generateToken";

export async function middleware(request: NextRequest) {
  if (request.url.includes("api/wishlist")) {
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

    const access_token = authorization.value.split(" ")[1];
    const decode = await verifyTokenJose<{ _id: string }>(access_token);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decode._id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }
  return NextResponse.next();
}

export const config = {
  matcher: "api/:path*",
};
