import { deleteWishlistById } from "@/db/models/wishlist";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const wishlist = await deleteWishlistById(params.id);
    console.log(wishlist);
    return Response.json({
      message: "Berhasil delete",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Invalid Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
