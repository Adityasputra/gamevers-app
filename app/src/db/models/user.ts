import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashPass } from "../helpers/hash";
import { COLLECTION_USER, DATABASE_NAME } from "../../constants";

export interface UserModel {
  _id: ObjectId;
  name: string;
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

export const getAllUsers = async () => {
  const db = await getDB();
  const users = (await db
    .collection(COLLECTION_USER)
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const getUserById = async (id: string) => {
  const db = await getDB();
  const objectId = new ObjectId(id);

  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ _id: objectId }, { projection: { password: 0 } })) as UserModel;

  return user;
};

export const createUser = async (user: UserModelInput) => {
  const db = await getDB();

  const modifiedUser: UserModelInput = {
    ...user,
    password: hashPass(user.password),
  };

  const newUser = await db.collection(COLLECTION_USER).insertOne(modifiedUser);
  return newUser;
};