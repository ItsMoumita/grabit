// app/dashboard/add-product/AddProductForm.jsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  function getSwalTheme() {
    const isDark =
      typeof document !== "undefined" &&
      (document.documentElement.classList.contains("dark") ||
        document.documentElement.getAttribute("data-theme") === "dark");

    return {
      background: isDark ? "#292b51" : "#ffffff",
      color: isDark ? "#eaf3f6" : "#091215",
      iconColor: isDark ? "#b8d9ff" : "#2a4ba7",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-lg",
      },
    };
  }

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
      details: form.get("details"),
    };

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      await Swal.fire({
        ...getSwalTheme(),
        icon: "success",
        title: "Product added",
        text: "Redirecting to products...",
        showConfirmButton: false,
        timer: 1400,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      router.push("/products");
      return;
    }

    const data = await res.json().catch(() => ({}));
    setError(data?.error || "Failed to add product");
  }

  return (
    <form onSubmit={onSubmit} className="bg-white dark:bg-[#191923] rounded-xl p-6 shadow space-y-4">
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

      <div>
        <label className="block mb-1">Details</label>
        <textarea
          name="details"
          rows="6"
          className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
          placeholder="Longer details/specs. Use new lines for bullet-like items."
        />
      </div>

      <button
        type="submit"
        className="cta-btn w-full shadow shadow-[#2a4ba7] dark:shadow-[#b8d9ff]"
        disabled={loading}
      >
        <span>{loading ? "Saving..." : "Save product"}</span>
      </button>
    </form>
  );
}