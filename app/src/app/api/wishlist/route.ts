import { NextResponse } from "next/server";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { addWishlist } from "@/db/models/wishlist";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = request.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json(
        { message: "User ID header is missing" },
        { status: 400 }
      );
    }

    const parsedData = z
      .object({
        productId: z.string(),
      })
      .safeParse(body);

    if (!parsedData.success) {
      const errorPath = parsedData.error.issues[0].path[0];
      const errorMessage = parsedData.error.issues[0].message;
      return NextResponse.json(
        { error: { message: `${errorPath} ${errorMessage}` } },
        { status: 400 }
      );
    }

    const wishlistData = {
      userId: new ObjectId(userId),
      productId: new ObjectId(parsedData.data.productId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await addWishlist(wishlistData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error in POST handler:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import {
//   COLLECTION_WISHLIST,
//   COLLECTION_USER,
//   COLLECTION_PRODUCT,
// } from "@/constants";
// import { getDB } from "@/db/models/wishlist";

// export async function GET(
//   request: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const db = await getDB();
//     const userObjectId = new ObjectId(params.userId);

//     const wishlistWithDetails = await db
//       .collection(COLLECTION_WISHLIST)
//       .aggregate<WishlistWithDetails>([
//         { $match: { userId: userObjectId } },
//         {
//           $lookup: {
//             from: COLLECTION_PRODUCT,
//             localField: "productId",
//             foreignField: "_id",
//             as: "product",
//           },
//         },
//         { $unwind: "$product" },
//         {
//           $lookup: {
//             from: COLLECTION_USER,
//             localField: "userId",
//             foreignField: "_id",
//             as: "user",
//           },
//         },
//         { $unwind: "$user" },
//         {
//           $project: {
//             _id: 1,
//             userId: 1,
//             productId: 1,
//             createdAt: 1,
//             updatedAt: 1,
//             product: {
//               _id: 1,
//               name: 1,
//               slug: 1,
//               description: 1,
//               excerpt: 1,
//               price: 1,
//               tags: 1,
//               thumbnail: 1,
//               images: 1,
//               createdAt: 1,
//               updatedAt: 1,
//             },
//             user: {
//               _id: 1,
//               name: 1,
//               username: 1,
//               email: 1,
//             },
//           },
//         },
//       ])
//       .toArray();

//     if (wishlistWithDetails.length === 0) {
//       return NextResponse.json(
//         { message: "No wishlist items found for this user" },
//         { status: 404 }
//       );
//     }

//     console.log(wishlistWithDetails, "<<<< wishlist");
//     return NextResponse.json(wishlistWithDetails, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching wishlist:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


