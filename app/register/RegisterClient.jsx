// app/register/RegisterClient.jsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
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

export default function RegisterClient() {
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
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.ok) {
        await Swal.fire({
          ...getSwalTheme(),
          icon: "success",
          title: "Account created",
          text: "Redirecting...",
          showConfirmButton: false,
          timer: 1400,
          timerProgressBar: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        router.push(callbackUrl);
      } else {
        setError("Registered, but sign-in failed. Please login.");
        await Swal.fire({
          ...getSwalTheme(),
          icon: "warning",
          title: "Sign-in needed",
          text: "Your account was created. Please login.",
          confirmButtonText: "OK",
        });
        router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }
      return;
    }

    const data = await res.json().catch(() => ({}));
    const message = data?.error || "Failed to register";
    setError(message);

    await Swal.fire({
      ...getSwalTheme(),
      icon: res.status === 409 ? "warning" : "error",
      title: res.status === 409 ? "Email already in use" : "Registration failed",
      text: message,
      confirmButtonText: "OK",
    });
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white dark:bg-[#191923] rounded-xl p-6 shadow">
      <h1 className="text-3xl text-center font-bold mb-4 text-[#2a4ba7] dark:text-[#b8d9ff]">Register</h1>

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

        <button
          type="submit"
          className="cta-btn w-full shadow shadow-[#2a4ba7] dark:shadow-[#b8d9ff]"
          disabled={loading}
        >
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