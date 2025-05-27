import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { COLLECTION_WISHLIST } from "@/constant";

export interface WishlistModel {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type WishlistModelInput = Omit<WishlistModel, "_id">;

export const createWishlist = async (wishlist: WishlistModelInput) => {
  const db = await getDB();

  const modifiedWishlist: WishlistModelInput = {
    userId: wishlist.userId,
    productId: wishlist.productId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const newWishlist = await db
    .collection(COLLECTION_WISHLIST)
    .insertOne(modifiedWishlist);

  return newWishlist;
};

export const getWishlist = async (id: string) => {
  const db = await getDB();

  const agg = [
    {
      $match: {
        userId: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: {
        path: "$product",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $project: {
        createdAt: 0,
        updatedAt: 0,
        userId: 0,
        productId: 0,
      },
    },
  ];

  const wishlist = await db
    .collection<WishlistModel>(COLLECTION_WISHLIST)
    .aggregate(agg)
    .toArray();

  return wishlist;
};

export const getWishlistById = async (productId: string, userId: string) => {
  const db = await getDB();

  const wishlist = await db
    .collection<WishlistModel>(COLLECTION_WISHLIST)
    .findOne({
      productId: new ObjectId(productId),
      userId: new ObjectId(userId),
    });

  return wishlist;
};

export const deleteWishlist = async (id: string) => {
  const db = await getDB();

  const wishlistId = new ObjectId(id);

  const wishlist = await db
    .collection<WishlistModel>(COLLECTION_WISHLIST)
    .deleteOne({
      _id: wishlistId,
    });

  return wishlist;
};
