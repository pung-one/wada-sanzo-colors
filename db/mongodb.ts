import { MongoClient } from "mongodb";

console.log("MONGODB CLIENT IMPORTED", new Error().stack);

const uri = process.env.MONGODB_URI!;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 20000,
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
