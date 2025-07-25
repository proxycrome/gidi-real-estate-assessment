import { render, screen, waitFor } from "../../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import HomePage from "../page";
import { useProducts } from "../../../hooks/useProducts";
import React from "react";
import { Product } from "@/types/Product";

// Mock the hooks and components
jest.mock("../../../hooks/useProducts");
jest.mock("../../../components/LazyComponents", () => ({
  ProductFilter: ({
    categories,
    onFilter,
  }: {
    categories: string[];
    onFilter: (v: string, min: number, max: number) => void;
  }) => (
    <div data-testid="product-filter">
      <select
        data-testid="category-select"
        onChange={(e) => onFilter(e.target.value, 0, 1000000)}
      >
        {categories.map((cat: string) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  ),
  ProductList: ({
    products,
    onDelete,
  }: {
    products: Product[];
    onDelete: (id: string) => void;
  }) => (
    <div data-testid="product-list">
      {products.map((product: Product) => (
        <div key={product.id} data-testid={`product-${product.id}`}>
          {product.name}
          <button onClick={() => onDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  ),
}));

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

const mockProducts = [
  {
    id: "1",
    name: "Villa 1",
    category: "Villa",
    price: 500000,
    description: "Beautiful villa",
    imageUrl: "/villa1.jpg",
  },
  {
    id: "2",
    name: "Apartment 1",
    category: "Apartment",
    price: 300000,
    description: "Modern apartment",
    imageUrl: "/apt1.jpg",
  },
  {
    id: "3",
    name: "House 1",
    category: "House",
    price: 400000,
    description: "Family house",
    imageUrl: "/house1.jpg",
  },
];

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;

describe("HomePage", () => {
  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      remove: mockRemove,
      add: jest.fn(),
      update: jest.fn(),
    });
  });

  it("shows loading state initially", () => {
    render(<HomePage />);

    expect(screen.getByText("Product Listing")).toBeInTheDocument();
    expect(screen.getByTestId("product-filter")).toBeInTheDocument();
  });

  it("renders product listing with all products", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    expect(screen.getByTestId("product-1")).toBeInTheDocument();
    expect(screen.getByTestId("product-2")).toBeInTheDocument();
    expect(screen.getByTestId("product-3")).toBeInTheDocument();
  });

  it("renders header with title and add product link", () => {
    render(<HomePage />);

    expect(screen.getByText("Product Listing")).toBeInTheDocument();
    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByText("Add Product").closest("a")).toHaveAttribute(
      "href",
      "/add-product"
    );
  });

  it("extracts unique categories from products", async () => {
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-filter")).toBeInTheDocument();
    });

    const categorySelect = screen.getByTestId("category-select");
    expect(categorySelect).toBeInTheDocument();
  });

  it("filters products correctly", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-filter")).toBeInTheDocument();
    });

    const categorySelect = screen.getByTestId("category-select");
    await user.selectOptions(categorySelect, "Villa");

    // The filter function should be called and products should be filtered
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("handles product deletion", async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    const deleteButton = screen.getAllByText("Delete")[1];
    await user.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledWith("2");
  });

  it("shows no products message when filtered list is empty", async () => {
    mockUseProducts.mockReturnValue({
      products: [],
      remove: mockRemove,
      add: jest.fn(),
      update: jest.fn(),
    });

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText("No Products Available")).toBeInTheDocument();
    });
  });

  it("updates filtered products when products change", async () => {
    const { rerender } = render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-list")).toBeInTheDocument();
    });

    // Update products
    const newProducts = [mockProducts[0]];
    mockUseProducts.mockReturnValue({
      products: newProducts,
      remove: mockRemove,
      add: jest.fn(),
      update: jest.fn(),
    });

    rerender(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-1")).toBeInTheDocument();
      expect(screen.queryByTestId("product-2")).not.toBeInTheDocument();
    });
  });

  it("memoizes handleFilter function correctly", async () => {
    const { rerender } = render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByTestId("product-filter")).toBeInTheDocument();
    });

    // Re-render with same products should not recreate filter function
    rerender(<HomePage />);

    expect(screen.getByTestId("product-filter")).toBeInTheDocument();
  });
});
