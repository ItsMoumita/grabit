// app/api/products/route.js
import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const query = category ? { category } : {};
    const items = await db
      .collection("products")
      .find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return Response.json({ items });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, price, category, image, description, details } = await req.json(); // <- added details

    if (!title || !price || !category) {
      return Response.json({ error: "title, price, and category are required" }, { status: 400 });
    }

    const db = await getDb();
    const result = await db.collection("products").insertOne({
      title,
      price: Number(price),
      category,
      image: image || "",
      description: description || "",
      details: details || "", // <- save details
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return Response.json({ ok: true, id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to create product" }, { status: 500 });
  }
}