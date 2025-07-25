import { Product } from "../types/Product";

const STORAGE_KEY = "products";

export function getProducts(): Product[] {
  if (typeof window === "undefined") return [];
  const data = window.localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Product): void {
  const products = getProducts();
  products.push(product);
  saveProducts(products);
}

export function updateProduct(updated: Product): void {
  const products = getProducts().map((p) =>
    p.id === updated.id ? updated : p
  );
  saveProducts(products);
}

export function deleteProduct(id: string): void {
  const products = getProducts().filter((p) => p.id !== id);
  saveProducts(products);
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts();
  console.log(products);
  return products.find((p) => p.id === id);
}
