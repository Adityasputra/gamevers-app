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
