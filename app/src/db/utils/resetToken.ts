import { randomBytes } from "crypto";
import { getDB } from "../config/mongodb";
import { COLLECTION_RESET_TOKEN } from "@/constant";

export const generateResetToken = async (email: string) => {
  const db = await getDB();
  const token = randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

  await db.collection(COLLECTION_RESET_TOKEN).insertOne({
    email,
    token,
    expiresAt,
  });

  return token;
};

export const verifyResetToken = async (token: string) => {
  const db = await getDB();
  const tokenData = await db
    .collection(COLLECTION_RESET_TOKEN)
    .findOne({ token });

  if (!tokenData || tokenData.expiresAt < new Date()) return null;

  return tokenData.email;
};

export const deleteResetToken = async (token: string) => {
  const db = await getDB();
  await db.collection(COLLECTION_RESET_TOKEN).deleteOne({ token });
};
