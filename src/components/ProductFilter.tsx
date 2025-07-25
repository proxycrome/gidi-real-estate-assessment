"use client";
import React, { useState } from "react";

type Props = {
  categories: string[];
  onFilter: (category: string, minPrice: number, maxPrice: number) => void;
};

const ProductFilter: React.FC<Props> = ({ categories, onFilter }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(category, minPrice, maxPrice);
  };

  return (
    <form className="flex flex-wrap gap-3 items-center mb-6" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="minPrice" className="mb-1 text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          id="minPrice"
          type="number"
          defaultValue={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="Min Price"
          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="maxPrice" className="mb-1 text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          id="maxPrice"
          type="number"
          defaultValue={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max Price"
          className="px-3 py-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
      </div>
      <button
        type="submit"
        className="self-end px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        Filter
      </button>
    </form>
  );
};

export default ProductFilter;