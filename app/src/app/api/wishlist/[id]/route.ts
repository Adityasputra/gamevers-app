import { deleteWishlistById } from "@/db/models/wishlist";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const result = await deleteWishlistById(params.id);
    return Response.json(
      {
        message: "Wishlist successfully deleted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

import { getWishlistWithDetails } from "@/db/models/wishlist";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wishlistId = params.id;
    const wishlist = await getWishlistWithDetails(wishlistId);

    if (!wishlist) {
      return NextResponse.json(
        { message: "Wishlist not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(wishlist, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}