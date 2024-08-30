import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { COLLECTION_PRODUCT, DATABASE_NAME } from "../../constants";

export interface ProductModel {
  _id: ObjectId;
  name: string;
  slug: string;
  description?: string;
  excerpt?: string;
  price?: number;
  tags?: string[];
  thumbnail?: string;
  images?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ProductModelInput = Omit<ProductModel, "_id">;

export const getDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const getAllProducts = async (
  search: string = "",
  page: number = 1,
  pageSize: number = 10
): Promise<ProductModel[]> => {
  try {
    const db = await getDB();
    const skip = (page - 1) * pageSize;
    const limit = pageSize;

    const product = (await db
      .collection(COLLECTION_PRODUCT)
      .find({ name: { $regex: search, $options: "i" } })
      .skip(skip)
      .limit(limit)
      .toArray()) as ProductModel[];

    return product;
  } catch (error) {
    console.error("Error fetching all products:", error);
    throw new Error("Failed to fetch products.");
  }
};

export const addProduct = async (
  product: ProductModelInput
): Promise<ProductModel> => {
  try {
    const db = await getDB();
    const modifiedProduct: ProductModelInput = {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { insertedId } = await db
      .collection(COLLECTION_PRODUCT)
      .insertOne(modifiedProduct);
    return { ...modifiedProduct, _id: insertedId } as ProductModel;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};

export const getProductById = async (
  id: string
): Promise<ProductModel | null> => {
  try {
    const db = await getDB();
    const objectId = new ObjectId(id);

    const product = (await db
      .collection(COLLECTION_PRODUCT)
      .findOne({ _id: objectId })) as ProductModel;

    return product;
  } catch (error) {
    console.error(`Error fetching product by ID ${id}:`, error);
    throw new Error("Failed to fetch product.");
  }
};

export const getProductCount = async (search: string = ""): Promise<number> => {
  try {
    const db = await getDB();

    const count = await db.collection(COLLECTION_PRODUCT).countDocuments({
      name: { $regex: search, $options: "i" },
    });

    return count;
  } catch (error) {
    console.error("Error counting products:", error);
    throw new Error("Failed to count products.");
  }
};
