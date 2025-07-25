import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Product",
  description: "Add a new product to the Gidi Real Estate E-commerce platform.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
