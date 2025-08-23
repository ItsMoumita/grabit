// app/register/page.jsx
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-md mx-auto mt-12 bg-white dark:bg-[#191923] rounded-xl p-6 shadow">
          <div className="animate-pulse">
            <div className="h-7 w-48 mx-auto bg-gray-200 dark:bg-gray-700 rounded mb-6" />
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      }
    >
      <RegisterClient />
    </Suspense>
  );
}