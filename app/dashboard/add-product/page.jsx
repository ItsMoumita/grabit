// app/dashboard/add-product/page.jsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AddProductForm from "./AddProductForm";

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard/add-product")}`);
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-4xl text-center font-bold mb-4 text-[#2a4ba7] dark:text-[#b8d9ff]">Add Product</h1>
      <AddProductForm />
    </div>
  );
}