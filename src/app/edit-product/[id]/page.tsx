"use client";
import React from "react";
import { useProducts } from "../../../hooks/useProducts";
import ProductForm from "../../../components/ProductForm";
import { useRouter, useParams } from "next/navigation";
import { Product } from "../../../types/Product";
import { ArrowLeft } from "lucide-react";

const EditProductPage: React.FC = () => {
  const { products, update } = useProducts();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="container mx-auto py-8">Product not found.</div>;
  }

  const handleUpdate = (updated: Product) => {
    update(updated);
    router.back();
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <div onClick={goBack} className="flex items-center mb-6 gap-2 cursor-pointer">
        <ArrowLeft />
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>
      <ProductForm initial={product} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditProductPage;
