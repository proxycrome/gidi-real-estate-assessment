import { useState, useEffect } from "react";
import { Product } from "../types/Product";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../utils/productStorage";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const add = (product: Product) => {
    addProduct(product);
    setProducts(getProducts());
  };

  const update = (product: Product) => {
    updateProduct(product);
    setProducts(getProducts());
  };

  const remove = (id: string) => {
    deleteProduct(id);
    setProducts(getProducts());
  };

  return { products, add, update, remove };
}
