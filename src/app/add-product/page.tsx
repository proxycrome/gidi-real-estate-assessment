"use client";
import React from "react";
import { useProducts } from "../../hooks/useProducts";
import ProductForm from "../../components/ProductForm";
import { useRouter } from "next/navigation";
import { Product } from "../../types/Product";
import { ArrowLeft } from "lucide-react";

const AddProductPage: React.FC = () => {
  const { add } = useProducts();
  const router = useRouter();

  const handleAdd = async (product: Product) => {
    add(product);
    router.push("/");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="container mx-auto py-8">
      <div onClick={goBack} className="flex items-center mb-6 gap-2 cursor-pointer">
        <ArrowLeft />
        <h1 className="text-2xl font-bold">Add Product</h1>
      </div>
      <ProductForm onSubmit={handleAdd} />
    </div>
  );
};

export default AddProductPage;
