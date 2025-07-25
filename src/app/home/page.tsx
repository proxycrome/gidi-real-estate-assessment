"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useProducts } from "@/hooks/useProducts";
import { ProductFilter, ProductList } from "@/components/LazyComponents";


const HomePage: React.FC = () => {
  const {products, remove} = useProducts();
  const [filtered, setFiltered] = useState(products);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setFiltered(products);
    setIsLoading(false);
  }, [products]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const handleFilter = useMemo(() => 
    (category: string, min: number, max: number) => {
      setFiltered(
        products.filter(
          (p) =>
            (category ? p.category === category : true) &&
            (min ? p.price >= Number(min) : true) &&
            (max ? p.price <= max : true)
        )
      );
    }, [products]
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Listing</h1>
        <Link href="/add-product" className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700">
          Add Product
        </Link>
      </div>
      <ProductFilter categories={categories} onFilter={handleFilter} />
      {filtered.length > 0 ? (
        <ProductList products={filtered} onDelete={remove} />
      ): (
        <p>No Products Available, Create a Product</p>
      )}
      
    </div>
  );
};

export default HomePage;
