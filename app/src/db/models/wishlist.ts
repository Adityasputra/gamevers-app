import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongodb";
import {
  COLLECTION_PRODUCT,
  COLLECTION_USER,
  COLLECTION_WISHLIST,
  DATABASE_NAME,
} from "@/constants";
import { ProductModel } from "./product";
import { UserModel } from "./user";

export interface WishlistBase {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface WishlistWithDetails {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
  product: ProductModel;
  user: UserModel;
}

export type WishlistModelInput = Omit<WishlistBase, "_id">;

export const getDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const addWishlist = async (wishlist: WishlistModelInput) => {
  try {
    const db = await getDB();
    const modifiedWishlist: WishlistModelInput = {
      ...wishlist,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection(COLLECTION_WISHLIST)
      .insertOne(modifiedWishlist);
    return result;
  } catch (error) {
    console.error("Error adding wishlist:", error);
    throw new Error("Failed to add wishlist.");
  }
};

export const deleteWishlistById = async (id: string) => {
  try {
    const db = await getDB();
    const objectId = new ObjectId(id);

    const result = await db
      .collection(COLLECTION_WISHLIST)
      .deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      console.warn(`No wishlist found with ID ${id}`);
      return null;
    }

    return result;
  } catch (error) {
    console.error(`Error deleting wishlist with ID ${id}:`, error);
    throw new Error("Failed to delete wishlist.");
  }
};

export const getWishlistWithDetails = async (
  wishlistId: string
): Promise<WishlistWithDetails | null> => {
  try {
    const db = await getDB();
    const objectId = new ObjectId(wishlistId);

    const result = await db
      .collection(COLLECTION_WISHLIST)
      .aggregate([
        { $match: { _id: objectId } },
        {
          $lookup: {
            from: COLLECTION_PRODUCT,
            localField: "productId",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $lookup: {
            from: COLLECTION_USER,
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
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
              price: 1,
              description: 1,
              thumbnail: 1,
              tags: 1,
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

    if (result.length === 0) return null;

    return result[0] as WishlistWithDetails;
  } catch (error) {
    console.error("Error getting wishlist with details:", error);
    throw new Error("Failed to get wishlist with details.");
  }
};

export const getWishlistByUserId = async (userId: string) => {
  try {
    const db = await getDB();
    const objectId = new ObjectId(userId);

    const wishlist = await db
      .collection(COLLECTION_WISHLIST)
      .find({ userId: objectId })
      .toArray();

    return wishlist;
  } catch (error) {
    console.error("Error fetching wishlist by user ID:", error);
    throw new Error("Failed to fetch wishlist.");
  }
};