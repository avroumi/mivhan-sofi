import { getDb } from "../src/config/mongodb.js";
import { ObjectId } from "mongodb";

const db = await getDb();
const usersCollection = db.collection("users");

export const getAllUsers = async () => {
  return await usersCollection.find({}).toArray();
};

export const findUserByEmail = async (email) => {
  return await usersCollection.findOne({ email });
};

export const createUser = async (data) => {
  const user = await usersCollection.insertOne(data);
  return user.insertedId;
};

export const findUserById = async (userId) => {
  return await usersCollection.findOne({ _id: new ObjectId(userId) });
};

export const deleteUserById = async (userId) => {
  return await usersCollection.deleteOne({ _id: new ObjectId(userId) });
};
