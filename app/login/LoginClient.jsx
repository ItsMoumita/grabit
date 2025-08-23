// app/login/LoginClient.jsx
"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

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
    customClass: { popup: "rounded-2xl shadow-lg" },
  };
}

export default function LoginClient() {
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
    const email = form.get("email");
    const password = form.get("password");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (res?.ok) {
      await Swal.fire({
        ...getSwalTheme(),
        icon: "success",
        title: "Welcome back!",
        text: "Signing you in...",
        showConfirmButton: false,
        timer: 1200,
        timerProgressBar: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      router.push(res.url || callbackUrl);
    } else {
      setError("Invalid email or password");
      await Swal.fire({
        ...getSwalTheme(),
        icon: "error",
        title: "Login failed",
        text: "Invalid email or password",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-[#292b51] rounded-xl p-6 shadow">
      <h1 className="text-2xl font-bold mb-4 text-[#2a4ba7] dark:text-[#b8d9ff]">Login</h1>

      {error ? <p className="mb-3 text-red-600">{error}</p> : null}

      <form onSubmit={onSubmit} className="space-y-4">
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
          <span>{loading ? "Signing in..." : "Sign in"}</span>
        </button>
      </form>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline text-[#2a4ba7] dark:text-[#b8d9ff]">
          Register
        </Link>
      </p>
    </div>
  );
}