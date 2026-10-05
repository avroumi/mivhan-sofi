import { getDb } from "../src/config/mongodb.js";
import { ObjectId } from "mongodb";

const db = await getDb();
const alertsCollection = db.collection("alerts");

export const getAllAlerts = async () => {
  return await alertsCollection.find({}).toArray();
};

export const getAlertById = async (alertId) => {
  return await alertsCollection.findOne({ _id: new ObjectId(alertId) });
};

export const createALert = async (data) => {
  const result = await alertsCollection.insertOne(data);
  return result.insertedId;
};

export const deleteAlert = async (alertId) => {
  return await alertsCollection.deleteOne({
    _id: new ObjectId(alertId),
  });
};

export const updateALert = (alertId, data) => {
  const updatedAlert = alertsCollection.findOneAndUpdate(
    { _id: new ObjectId(alertId) },
    { $set: data },
    { returnDocument: "after" },
  );
  return updatedAlert;
};
