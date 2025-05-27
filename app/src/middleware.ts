import { verifyTokenJose } from "@/db/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api/wishlist")) {
    const authorization = request.cookies.get("Authorization");

    if (!authorization) {
      console.warn("Authorization cookie not found");
      return NextResponse.json(
        { message: "Authentication Failed" },
        { status: 401 }
      );
    }

    const rawToken = authorization.value;

    if (!rawToken.startsWith("Bearer ")) {
      console.warn("Invalid Authorization format");
      return NextResponse.json(
        { message: "Invalid token format" },
        { status: 401 }
      );
    }

    const access_token = rawToken.split(" ")[1];

    try {
      const decoded = await verifyTokenJose<{ _id: string }>(access_token);
      console.log("Decoded user ID:", decoded._id);

      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-id", decoded._id);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.json(
        { message: "Authentication Failed" },
        { status: 401 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
