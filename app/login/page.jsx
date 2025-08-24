// app/login/page.jsx
import { Suspense } from "react";
import LoginClient from "./LoginClient";
import Loader from "../components/Loader";

export const dynamic = "force-dynamic"; // avoids prerendering issues

export default function LoginPage() {
  return (
    <Suspense fallback={<Loader fullScreen label="Loading..." />}>
      <LoginClient />
    </Suspense>
  );
}