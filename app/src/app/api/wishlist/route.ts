import {
  createWishlist,
  getWishlist,
  getWishlistById,
} from "@/db/models/Wishlist";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";

const wishlistSchema = z.object({
  userId: z
    .string()
    .refine((val) => ObjectId.isValid(val), { message: "Invalid userId" }),
  productId: z
    .string()
    .refine((val) => ObjectId.isValid(val), { message: "Invalid productId" }),
});

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const userId = (await headers()).get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { error: { message: "Unauthorized: user ID missing" } },
        { status: 401 }
      );
    }

    const input = { ...rawBody, userId };

    const validated = wishlistSchema.safeParse(input);

    if (!validated.success) {
      return NextResponse.json(
        {
          error: {
            message: validated.error.issues
              .map((issue) => issue.message)
              .join(", "),
          },
        },
        { status: 400 }
      );
    }

    const { userId: validUserId, productId } = validated.data;

    const existing = await getWishlistById(productId, validUserId);
    if (existing) {
      return NextResponse.json(
        { error: { message: "Product already in wishlist" } },
        { status: 400 }
      );
    }

    const result = await createWishlist({
      userId: new ObjectId(validUserId),
      productId: new ObjectId(productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json(
      {
        message: "Wishlist item created",
        wishlistId: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /wishlist error:", error);

    return NextResponse.json(
      { error: { message: "Internal Server Error" } },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = (await headers()).get("x-user-id");

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { error: { message: "Invalid or missing user ID" } },
        { status: 400 }
      );
    }

    const wishlist = await getWishlist(userId);

    return NextResponse.json(wishlist, {
      status: 200,
    });
  } catch (error) {
    console.error("GET /wishlist error:", error);

    return NextResponse.json(
      { error: { message: "Failed to fetch wishlist" } },
      { status: 500 }
    );
  }
}
