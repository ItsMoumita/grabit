import Link from "next/link";
import { getDb } from "@/lib/mongodb";

export default async function ProductHighlights() {
  const db = await getDb();
  const items = await db
    .collection("products")
    .find({})
    .sort({ createdAt: -1, _id: -1 }) // newest first (fallback to _id)
    .limit(12)
    .toArray();

  if (!items.length) {
    return (
      <section className="mt-10">
        <div className="max-w-6xl mx-auto p-4">
          <h2 className="text-center text-2xl font-bold text-[#2a4ba7] dark:text-[#b8d9ff]">
            Product Highlights
          </h2>
          <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-300">
            No products yet. Add one from Dashboard → Add Product.
          </p>
        </div>
      </section>
    );
  }

  const Card = ({ p }) => (
    <div className="min-w-[220px] sm:min-w-[260px] bg-white dark:bg-[#292b51] rounded-xl p-4 shadow flex-shrink-0">
      {p.image ? (
        <img
          src={p.image}
          alt={p.title}
          className="w-full h-36 object-cover rounded-lg mb-3"
        />
      ) : null}
      <h3 className="font-semibold text-base line-clamp-1">{p.title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold">${Number(p.price).toLocaleString()}</span>
        <span className="text-xs px-2 py-1 rounded-full bg-[#2a4ba7]/10 text-[#2a4ba7] dark:bg-[#b8d9ff]/10 dark:text-[#b8d9ff]">
          {p.category}
        </span>
      </div>
      <div className="mt-3 flex justify-end">
        <Link
          href={`/products/${p._id.toString()}`}
          className="inline-flex items-center justify-center rounded-full border border-[#2a4ba7] dark:border-[#b8d9ff] px-3 py-1.5 text-xs font-medium text-[#2a4ba7] dark:text-[#b8d9ff] hover:bg-[#2a4ba7] hover:text-white dark:hover:bg-[#b8d9ff] dark:hover:text-gray-900 transition-colors"
        >
          View details
        </Link>
      </div>
    </div>
  );

  return (
    <section className="mt-10 md:mt-14">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-[#2a4ba7] dark:text-[#b8d9ff]">
          Product Highlights
        </h2>

        {/* Marquee */}
        <div className="group relative mt-5">
          <div className="overflow-hidden marquee-mask rounded-xl">
            <div className="flex gap-4 marquee-track">
              {/* Track A */}
              {items.map((p) => (
                <Card key={p._id.toString()} p={p} />
              ))}
              {/* Track B (duplicate for seamless loop) */}
              {items.map((p) => (
                <Card key={`${p._id.toString()}-dup`} p={p} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}