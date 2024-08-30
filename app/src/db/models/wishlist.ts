import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { COLLECTION_WISHLIST, DATABASE_NAME } from "@/constants";

export interface Wishlist {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type WishlistModelInput = Omit<Wishlist, "_id">;

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
