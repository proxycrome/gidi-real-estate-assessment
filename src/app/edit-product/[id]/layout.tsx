import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Product",
  description: "Edit a product on the Gidi Real Estate E-commerce platform.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
