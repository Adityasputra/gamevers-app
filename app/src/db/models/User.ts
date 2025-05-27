import { ObjectId } from "mongodb";
import { getDB } from "../config/mongodb";
import { hashPassword } from "../utils/bcrypt";
import { COLLECTION_USER } from "@/constant";

export interface UserModel {
  _id: ObjectId;
  name?: string;
  username: string;
  email: string;
  password: string;
}

export type UserModelInput = Omit<UserModel, "_id">;

export const createUser = async (user: UserModelInput) => {
  try {
    const db = await getDB();

    const modifiedUser = {
      ...user,
      password: hashPassword(user.password),
    };

    await db.collection(COLLECTION_USER).insertOne(modifiedUser);

    return {
      name: user.name ?? null,
      username: user.username,
      email: user.email,
    };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const db = await getDB();
    const user = (await db
      .collection(COLLECTION_USER)
      .findOne({ email })) as UserModel | null;

    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Failed to fetch user");
  }
};

export const getUserByUsername = async (username: string) => {
  try {
    const db = await getDB();
    const user = (await db
      .collection(COLLECTION_USER)
      .findOne({ username })) as UserModel | null;

    return user;
  } catch (error) {
    console.error("Error fetching user by username:", error);
    throw new Error("Failed to fetch user");
  }
};
