import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { COLLECTION_PRODUCT } from "@/constant";

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

export const getAllProduct = async (
  search: string = "",
  page: number = 1,
  pageSize: number = 8
): Promise<ProductModel[]> => {
  const db = await getDB();
  const skip = (page - 1) * pageSize;

  const products = await db
    .collection<ProductModel>(COLLECTION_PRODUCT)
    .find({ name: { $regex: search, $options: "i" } })
    .skip(skip)
    .limit(pageSize)
    .sort({ createdAt: -1 })
    .toArray();

  return products;
};

export const getProductBySlug = async (
  slug: string
): Promise<ProductModel | null> => {
  const db = await getDB();
  const product = await db
    .collection<ProductModel>(COLLECTION_PRODUCT)
    .findOne({ slug });

  return product;
};

export const getProductCount = async (search: string = ""): Promise<number> => {
  const db = await getDB();

  const count = await db
    .collection<ProductModel>(COLLECTION_PRODUCT)
    .countDocuments({
      name: { $regex: search, $options: "i" },
    });

  return count;
};
