import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "../../../../../lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const db = await connectDb();
    const users = db.collection("users");

    const user = await users.findOne({ username });
    if (!user || user.password !== password) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    return NextResponse.json({ message: "Login successful" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
