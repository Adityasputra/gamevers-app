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
  const db = await getDB();
  const modifiedWishlist: WishlistModelInput = {
    ...wishlist,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const addWishlist = await db
    .collection(COLLECTION_WISHLIST)
    .insertOne(modifiedWishlist);

  return addWishlist;
};

export const deleteWishlistById = async (id: string) => {
  const db = await getDB();
  console.log(id);
  const objectId = new ObjectId(id);
  console.log(objectId);
  const wishlist = await db
    .collection(COLLECTION_WISHLIST)
    .deleteOne({ _id: objectId });

  console.log(wishlist);
  return wishlist;
};
