// app/register/page.jsx
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";
import Loader from "../components/Loader";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <Suspense fallback={<Loader fullScreen label="Loading..." />}>
      <RegisterClient />
    </Suspense>
  );
}