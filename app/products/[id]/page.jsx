// app/products/[id]/page.jsx
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }) {
    const { id } = params;

    if (!ObjectId.isValid(id)) notFound();

    const db = await getDb();
    const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });

    if (!product) notFound();

    return (
        <div className="max-w-4xl mx-auto p-4 mt-6 md:mt-8">
            <Link href="/products" className="text-3xl font-semibold text-center  text-[#2a4ba7] hover:text-[#2a4ba7]/80  dark:text-[#b8d9ff] hover:dark:text-[#b8d9ff]/80 transition-colors">
                ← Back to products
            </Link>

            <div className="mt-4 grid gap-6 md:grid-cols-2 bg-white dark:bg-[#191923] rounded-xl p-6 shadow">
                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-72 object-cover rounded-lg"
                    />
                ) : (
                    <div className="w-full h-72 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                )}

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="font-bold text-xl">
                            ${Number(product.price).toLocaleString()}
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-[#2a4ba7]/10 text-[#2a4ba7] dark:bg-[#b8d9ff]/10 dark:text-[#b8d9ff]">
                            {product.category}
                        </span>
                    </div>

                    {product.description ? (
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold mb-2">Details</h2>
                            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {product.details}
                            </p>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
}