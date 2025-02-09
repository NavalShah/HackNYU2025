import { MongoClient } from "mongodb";

const uri = "mongodb+srv://sidnori:<db_password>@logindatabase.9t7f5.mongodb.net/?retryWrites=true&w=majority&appName=LoginDatabase";


if (!uri) {
  throw new Error("MongoDB URI is missing");
}

let client: MongoClient;
let db: any;

export async function connectDb() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db();
  }
  return db;
}
