// models/User.ts
import clientPromise from '../lib/mongodb';
import bcrypt from 'bcrypt';

// Define the structure of a User
interface User {
  email: string;
  password: string;
}

// Function to create a new user
export async function createUser({ email, password }: User): Promise<{ insertedId: string }> {
  const client = await clientPromise;
  const db = client.db(); // Replace with your database name
  const usersCollection = db.collection<User>('users');

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  const result = await usersCollection.insertOne({
    email,
    password: hashedPassword,
  });

  return { insertedId: result.insertedId.toString() };
}

// Function to find a user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  const client = await clientPromise;
  const db = client.db(); // Replace with your database name
  const usersCollection = db.collection<User>('users');

  const user = await usersCollection.findOne({ email });
  return user;
}