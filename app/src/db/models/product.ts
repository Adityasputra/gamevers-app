import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { COLLECTION_PRODUCT, DATABASE_NAME } from "../../../context";

export interface ProductModel {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProductModelInput = Omit<ProductModel, "_id">;
export const getDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);

  return db;
};

export const getAllProduct = async () => {
  const db = await getDB();
  const products = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .toArray()) as ProductModel[];

  return products;
};
