// app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { hash } from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing name, email, or password" }, { status: 400 });
    }

    const db = await getDb();

    const existing = await db.collection("users").findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const hashed = await hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email: email.toLowerCase(),
      password: hashed,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}