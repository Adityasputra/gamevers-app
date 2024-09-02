import { NextResponse } from "next/server";
import { getWishlistByUserId } from "@/db/models/wishlist";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const wishlist = await getWishlistByUserId(params.userId);

    if (!wishlist || wishlist.length === 0) {
      return NextResponse.json(
        { message: "No wishlist found for this user" },
        { status: 404 }
      );
    }

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
