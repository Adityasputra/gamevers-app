import { deleteWishlist } from "@/db/models/Wishlist";
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function DELETE(request: NextRequest) {
  try {
    // Ambil id dari pathname, misalnya /api/wishlist/6651a7...
    const id = request.nextUrl.pathname.split("/").pop();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: { message: "Invalid wishlist ID" } },
        { status: 400 }
      );
    }

    const result = await deleteWishlist(id);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: { message: "Wishlist item not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Wishlist item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /wishlist/:id error:", error);
    return NextResponse.json(
      { error: { message: "Failed to delete wishlist item" } },
      { status: 500 }
    );
  }
}
