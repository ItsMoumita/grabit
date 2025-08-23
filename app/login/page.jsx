// app/login/page.jsx
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic"; // avoids prerendering issues

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto mt-12 bg-white dark:bg-[#292b51] rounded-xl p-6 shadow">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="space-y-3">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      }
    >
      <LoginClient />
    </Suspense>
  );
}