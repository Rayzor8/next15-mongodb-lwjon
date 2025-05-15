import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI)
  throw new Error("MONGODB_URI is not defined / not found");

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function getDB(dbName: string) {
  try {
    await client.connect();
    console.log(">>>>>>>> Connected successfully to DB server <<<<<<<<");
    return client.db(dbName);
  } catch (error) {
    console.log(error);
  }
}

export async function getCollection(collectionName: string) {
  const db = await getDB("next-blog-db");

  if (!db) return null;

  return db.collection(collectionName);
}
