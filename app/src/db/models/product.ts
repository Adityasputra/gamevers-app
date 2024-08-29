import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { COLLECTION_PRODUCT, DATABASE_NAME } from "../../constants";

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

export const getAllProducts = async () => {
  const db = await getDB();
  const products = (await db
    .collection(COLLECTION_PRODUCT)
    .find()
    .toArray()) as ProductModel[];

  return products;
};

export const addProduct = async (product: ProductModelInput) => {
  try {
    const db = await getDB();
    const modifiedProduct: ProductModelInput = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const newProduct = await db
      .collection(COLLECTION_PRODUCT)
      .insertOne(modifiedProduct);

    return newProduct;
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: string) => {
  const db = await getDB();
  console.log(id)
  const objectId = new ObjectId(id);
  console.log(objectId);

  const product = (await db
    .collection(COLLECTION_PRODUCT)
    .findOne({ _id: objectId })) as ProductModel;

  console.log(product);
  return product;
};
