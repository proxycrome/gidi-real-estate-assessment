"use client";
import React from "react";
import Link from "next/link";
import { useProducts } from "../../../hooks/useProducts";
import { useRouter } from "next/navigation";

interface Props {
  productId: string;
}

const ClientProductActions: React.FC<Props> = ({ productId }) => {
  const { remove } = useProducts();
  const router = useRouter();

  const handleDelete = () => {
    remove(productId);
    router.push("/");
  };

  return (
    <div className="flex gap-2">
      <Link
        href={`/edit-product/${productId}`}
        className="px-3 py-1 rounded bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
      >
        Edit
      </Link>
      <button
        className="px-3 py-1 rounded bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default ClientProductActions;