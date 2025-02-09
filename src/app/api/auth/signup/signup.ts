import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const db = await connectDb();
    const users = db.collection("users");

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    await users.insertOne({ username, password });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
