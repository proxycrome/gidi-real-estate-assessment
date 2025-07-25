"use client";

import React, { useState } from "react";
import { Product } from "../types/Product";

type Props = {
  initial?: Product;
  onSubmit: (product: Product) => void;
};

const defaultProduct: Product = {
  id: "",
  name: "",
  description: "",
  price: 0,
  category: "",
  imageUrl: "",
};

const ProductForm: React.FC<Props> = ({ initial, onSubmit }) => {
  const [product, setProduct] = useState<Product>(initial || defaultProduct);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...product, id: product.id || Date.now().toString() });
  };

  return (
    <form className="space-y-4" data-testid="product-form" onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Name"
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="description" className="mb-1 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="price" className="mb-1 text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          name="price"
          type="number"
          defaultValue={product.price}
          onChange={handleChange}
          placeholder="Price"
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1 text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          id="category"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category"
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="imageUrl" className="mb-1 text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          id="imageUrl"
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        {initial ? "Update" : "Add"} Product
      </button>
    </form>
  );
};

export default ProductForm;