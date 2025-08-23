// app/api/db/ping/route.js
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    await client.db().command({ ping: 1 });
    return Response.json({ ok: true, message: "MongoDB connected" });
  } catch (err) {
    console.error(err);
    return Response.json({ ok: false, error: "DB connection failed" }, { status: 500 });
  }
}