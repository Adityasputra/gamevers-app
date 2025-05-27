import { DATABASE_NAME } from "@/constant";
import { MongoClient, Db } from "mongodb";

/**
 * The MongoDB connection URI of the environment variable.
 * Must be defined in .env as `NEXT_PUBLIC_MONGO_URI`.
 */
const MONGO_URI = process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_MONGO_URI must be defined."
  );
}

//
let mongoClient: MongoClient | null = null;
let mongoClientPromise: Promise<MongoClient> | null = null;

/**
 * Returns the connected `MongoClient` instance.
 * Using the singleton pattern so that connections are not created repeatedly.
 *
 * @returns Promise<MongoClient> Instance of MongoDB Client
 * @throws Error if connection fails
 */
export const getMongoClientInstance = async (): Promise<MongoClient> => {
  if (!mongoClientPromise) {
    mongoClient = new MongoClient(MONGO_URI);
    mongoClientPromise = mongoClient
      .connect()
      .then((connectedClient) => {
        console.log("[MongoDB] Connected successfully");
        return connectedClient;
      })
      .catch((error) => {
        mongoClient = null;
        mongoClientPromise = null;
        console.error("[MongoDB] Connection failed:", error);
        throw error;
      });
  }

  return mongoClientPromise;
};

/**
 * Returns the database instance (`Db`) of the connected MongoDB.
 * The database name is taken from `DATABASE_NAME`.
 *
 * @returns Promise<Db> Instance of MongoDB database
 */
export const getDB = async (): Promise<Db> => {
  const client = await getMongoClientInstance();
  return client.db(DATABASE_NAME);
};
