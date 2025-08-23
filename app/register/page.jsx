"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    setLoading(false);

    if (res.ok) {
      // Auto sign-in after register (optional)
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl,
      });
      return;
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data?.error || "Failed to register");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-[#292b51] rounded-xl p-6 shadow">
      <h1 className="text-2xl font-bold mb-4 text-[#2a4ba7] dark:text-[#b8d9ff]">Register</h1>

      {error ? <p className="mb-3 text-red-600">{error}</p> : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            required
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-md border px-3 py-2 bg-white dark:bg-[#12121c]"
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="cta-btn w-full shadow shadow-[#2a4ba7] dark:shadow-[#b8d9ff]" disabled={loading}>
          <span>{loading ? "Creating account..." : "Create account"}</span>
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="underline text-[#2a4ba7] dark:text-[#b8d9ff]">
          Login
        </Link>
      </p>
    </div>
  );
}