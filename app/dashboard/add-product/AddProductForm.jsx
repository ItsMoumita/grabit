"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      title: form.get("title"),
      price: form.get("price"),
      category: form.get("category"),
      image: form.get("image"),
      description: form.get("description"),
      details: form.get("details"), // <- NEW
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/products");
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Failed to add product");
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-[#292b51] rounded-xl p-6 shadow space-y-4">
      {error ? <p className="text-red-600">{error}</p> : null}

      <div>
        <label className="block mb-1">Title</label>
        <input
          name="title"
          required
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
          placeholder="Product title"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block mb-1">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            required
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
            placeholder="19.99"
          />
        </div>
        <div>
          <label className="block mb-1">Category</label>
          <input
            name="category"
            required
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
            placeholder="mens"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Image URL (optional)</label>
        <input
          name="image"
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
          placeholder="https://..."
        />
      </div>

      <div>
        <label className="block mb-1">Description</label>
        <textarea
          name="description"
          rows="3"
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
          placeholder="Short description"
        />
      </div>

      {/* NEW: Details field */}
      <div>
        <label className="block mb-1">Details</label>
        <textarea
          name="details"
          rows="6"
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
          placeholder="Longer details/specs. Use new lines for bullet-like items."
        />
      </div>

      <button type="submit" className="cta-btn w-full shadow shadow-[#2a4ba7] dark:shadow-[#b8d9ff]" disabled={loading}>
        <span>{loading ? "Saving..." : "Save product"}</span>
      </button>
    </form>
  );
}