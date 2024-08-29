import { addWishlist } from "@/db/models/wishlist";
import { headers } from "next/headers";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    let body = await request.json();
    body = { ...body, userId: headers().get("x-user-id") };

    const parsedData = z
      .object({
        userId: z.string(),
        productId: z.string(),
      })
      .safeParse(body);

    if (!parsedData.success) {
      throw parsedData.error;
    }

    const wishlist = await addWishlist(body);
    return Response.json(wishlist, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error.issues);
      const errorPath = error.issues[0].path[0];
      const errorMessage = error.issues[0].message;

      return Response.json(
        {
          error: {
            message: `${errorPath} ${errorMessage}`,
          },
        },
        {
          status: 400,
        }
      );
    }

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
