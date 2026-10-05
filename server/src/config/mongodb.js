import { MongoClient } from "mongodb";
import "dotenv/config";
import { AppError } from "../utils/AppError.js";

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export const connectDb = async () => {
  await client.connect();
  db = client.db("tzofia-eye");
  console.log("mongodb connected");
  return db;
};

export const getDb = async () => {
  await connectDb();
  if (!db) {
    throw new AppError("Db not fond", 500);
  }
  return db;
};
