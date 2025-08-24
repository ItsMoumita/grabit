// app/api/products/route.js
export const runtime = "nodejs"; // required for Mongo/bcrypt

import { getDb } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // ensure this file exists and exports authOptions

export async function GET(req) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limitParam = Number.parseInt(searchParams.get("limit") || "50", 10);
    const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(limitParam, 50)) : 50;

    const query = category ? { category } : {};
    const docs = await db
      .collection("products")
      .find(query)
      .sort({ createdAt: -1, _id: -1 })
      .limit(limit)
      .toArray();

    const items = docs.map((d) => ({ ...d, _id: d._id.toString() }));
    return Response.json({ items }, { status: 200 });
  } catch (err) {
    console.error("GET /api/products error:", err);
    return Response.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json().catch(() => null);
    if (!body) return Response.json({ error: "Invalid JSON body" }, { status: 400 });

    const { title, price, category, image = "", description = "", details = "" } = body;
    if (!title || price === undefined || !category) {
      return Response.json({ error: "title, price, and category are required" }, { status: 400 });
    }

    const doc = {
      title: String(title),
      price: Number(price),
      category: String(category),
      image: String(image),
      description: String(description),
      details: String(details),
      createdBy: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const db = await getDb();
    const result = await db.collection("products").insertOne(doc);

    return Response.json({ ok: true, id: result.insertedId.toString() }, { status: 201 });
  } catch (err) {
    console.error("POST /api/products error:", err);
    return Response.json({ error: err?.message || "Failed to create product" }, { status: 500 });
  }
}