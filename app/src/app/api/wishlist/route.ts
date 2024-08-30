import { addWishlist } from "@/db/models/wishlist";
import { headers } from "next/headers";
import { z } from "zod";

export async function POST(request: Request) {
  try {
    let body = await request.json();
    const userId = headers().get("x-user-id");

    if (!userId) {
      return Response.json(
        {
          message: "User ID header is missing",
        },
        {
          status: 400,
        }
      );
    }

    body = { ...body, userId };

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

    console.error(error);
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

import { ObjectId } from "mongodb";
import {
  COLLECTION_WISHLIST,
  COLLECTION_USER,
  COLLECTION_PRODUCT,
  DATABASE_NAME,
} from "@/constants";
import { getDB } from "@/db/models/user";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const db = await getDB();
    const userObjectId = new ObjectId(params.userId);

    const wishlistWithDetails = await db
      .collection(COLLECTION_WISHLIST)
      .aggregate([
        {
          $match: { userId: userObjectId },
        },
        {
          $lookup: {
            from: COLLECTION_PRODUCT,
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $lookup: {
            from: COLLECTION_USER,
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $unwind: "$user",
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            productId: 1,
            createdAt: 1,
            updatedAt: 1,
            product: {
              _id: 1,
              name: 1,
              slug: 1,
              description: 1,
              excerpt: 1,
              price: 1,
              tags: 1,
              thumbnail: 1,
              images: 1,
              createdAt: 1,
              updatedAt: 1,
            },
            user: {
              _id: 1,
              name: 1,
              username: 1,
              email: 1,
            },
          },
        },
      ])
      .toArray();

    if (wishlistWithDetails.length === 0) {
      return Response.json(
        {
          message: "No wishlist items found for this user",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(wishlistWithDetails, {
      status: 200,
    });
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
