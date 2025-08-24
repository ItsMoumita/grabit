import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

let clientPromise;

if (!globalThis._mongoClientPromise) {
  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 5000 });
  globalThis._mongoClientPromise = client.connect();
}
clientPromise = globalThis._mongoClientPromise;

export async function getDb() {
  const client = await clientPromise;
  return client.db("grabitdb"); // ensure correct DB name
}

export default clientPromise;