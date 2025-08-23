// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  const dbName = "grabitdb";
  return client.db(dbName); // <- important
}

// optional helper if you use it
export async function getCollection() {
  const db = await getDb();
  return db.collection("clothes");
}

export default clientPromise;