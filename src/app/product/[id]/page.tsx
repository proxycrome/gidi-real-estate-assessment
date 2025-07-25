"use client";

import React from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useProducts } from '@/hooks/useProducts';
import { ProductStructuredData } from '@/components/StructuredData';
import { ArrowLeft } from 'lucide-react';
import { ClientProductActions } from "@/components/LazyComponents";

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div className="container mx-auto py-8">Product not found.</div>;
  }

  const goBack = () => {
    router.back();
  };

  return (
    <>
      <ProductStructuredData product={product} />
      <div className="container mx-auto">
        <div
          onClick={goBack}
          className="flex items-center mb-4 gap-2 cursor-pointer"
        >
          <ArrowLeft />
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>
        <div className="container mx-auto py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative w-full md:w-1/2">
              <Image
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-96 object-cover rounded"
                width={600}
                height={400}
                sizes="(max-width: 768px) 100vw, 50vw"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-600 mb-2 text-lg">{product.category}</p>
              <p className="text-blue-600 font-bold mb-6 text-2xl">
                ${product.price.toLocaleString()}
              </p>
              <p className="mb-6 text-gray-700 leading-relaxed">
                {product.description}
              </p>
              <ClientProductActions productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
