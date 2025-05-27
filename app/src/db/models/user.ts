import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongodb";
import { hashPass } from "../helpers/bcrypt";
import { COLLECTION_USER, DATABASE_NAME } from "../../constants";

export interface UserModel {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
}

export type UserModelInput = Omit<UserModel, "_id">;

export const getDB = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  return db;
};

export const getAllUsers = async (): Promise<UserModel[]> => {
  try {
    const db = await getDB();
    const users = (await db
      .collection(COLLECTION_USER)
      .find()
      .project({ password: 0 })
      .toArray()) as UserModel[];

    return users;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw new Error("Failed to fetch users.");
  }
};

export const getUserById = async (id: string): Promise<UserModel | null> => {
  try {
    const db = await getDB();
    const objectId = new ObjectId(id);

    const user = (await db
      .collection(COLLECTION_USER)
      .findOne(
        { _id: objectId },
        { projection: { password: 0 } }
      )) as UserModel;

    return user;
  } catch (error) {
    console.error(`Error fetching user by ID ${id}:`, error);
    throw new Error("Failed to fetch user.");
  }
};

export const createUser = async (user: UserModelInput): Promise<UserModel> => {
  try {
    const db = await getDB();
    const modifiedUser: UserModelInput = {
      ...user,
      password: hashPass(user.password),
    };

    const { insertedId } = await db
      .collection(COLLECTION_USER)
      .insertOne(modifiedUser);
    return { ...modifiedUser, _id: insertedId } as UserModel;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user.");
  }
};

export const getUserByEmail = async (
  email: string
): Promise<UserModel | null> => {
  try {
    const db = await getDB();
    const user = (await db
      .collection(COLLECTION_USER)
      .findOne({ email })) as UserModel;
    return user;
  } catch (error) {
    console.error(`Error fetching user by email ${email}:`, error);
    throw new Error("Failed to fetch user.");
  }
};
