import { MongoClient } from "mongodb";
const connectDB = process.env.MONGO_URI;

if (!connectDB) {
  throw new Error("MONGODB_CONNECTION is not defined");
}

let client: MongoClient;
export const getMongoClientInstance = async () => {
  if (!client) {
    client = new MongoClient(connectDB);
    await client.connect();
  }

  return client;
};
