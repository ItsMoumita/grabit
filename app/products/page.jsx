// app/products/page.jsx
import Link from "next/link";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }) {
  const category = searchParams?.category || null;

  const db = await getDb();
  const query = category ? { category } : {};
  const items = await db
    .collection("products")
    .find(query)
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-4xl text-center mt-6 md:mt-8 font-bold mb-6 md:mb-8 text-[#2a4ba7] dark:text-[#b8d9ff]">
        {category ? `Products — ${category}` : "All Products"}
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p._id.toString()} className="bg-white dark:bg-[#191923] rounded-xl p-4 shadow">
            {p.image ? (
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
            ) : null}
            <h2 className="font-semibold text-lg">{p.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {p.description}
            </p>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-bold">${Number(p.price).toLocaleString()}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#2a4ba7]/10 text-[#2a4ba7] dark:bg-[#b8d9ff]/10 dark:text-[#b8d9ff]">
                {p.category}
              </span>
            </div>

            {/* View details button */}
            <div className="mt-4 flex justify-end">
              <Link
                href={`/products/${p._id.toString()}`}
                className="inline-flex items-center justify-center rounded-full border border-[#2a4ba7] dark:border-[#b8d9ff] px-4 py-2 text-sm font-medium text-[#2a4ba7] dark:text-[#b8d9ff] hover:bg-[#2a4ba7] hover:text-white dark:hover:bg-[#b8d9ff] dark:hover:text-gray-900 transition-colors"
              >
                View details
              </Link>
            </div>
          </div>
        ))}

        {items.length === 0 && <p>No products yet.</p>}
      </div>
    </div>
  );
}