import { render, screen } from "../../../../utils/test-utils";
import userEvent from "@testing-library/user-event";
import EditProductPage from "../page";
import { useProducts } from "../../../../hooks/useProducts";
import "@testing-library/jest-dom";
import { useParams } from "next/navigation";
import { Product } from "@/types/Product";

// Mock dependencies
jest.mock("../../../../hooks/useProducts");
jest.mock("../../../../components/ProductForm", () => {
  return function MockProductForm({
    initial,
    onSubmit,
  }: {
    initial?: Product;
    onSubmit: (product: Partial<Product>) => void;
  }) {
    return (
      <form
        data-testid="product-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            ...initial,
            name: "Updated Product Name",
          });
        }}
      >
        <div data-testid="initial-product">
          {initial?.name || "No initial product"}
        </div>
        <button type="submit">Update Product</button>
      </form>
    );
  };
});

const mockProduct = {
  id: "1",
  name: "Test Villa",
  category: "Villa",
  price: 500000,
  description: "A beautiful test villa",
  imageUrl: "/test-villa.jpg",
};

const mockProducts = [mockProduct];

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockUpdate = jest.fn();
const mockRouterBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockRouterBack,
  }),
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("EditProductPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      add: jest.fn(),
      remove: jest.fn(),
      update: mockUpdate,
    });

    mockUseParams.mockReturnValue({ id: "1" });
  });

  it("renders edit product page correctly", () => {
    render(<EditProductPage />);

    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
    expect(screen.getByText("Test Villa")).toBeInTheDocument();
  });

  it("renders back button with arrow icon", () => {
    render(<EditProductPage />);

    const backButton = screen.getByText("Edit Product").closest("div");
    expect(backButton).toHaveClass(
      "flex",
      "items-center",
      "mb-6",
      "gap-2",
      "cursor-pointer"
    );
  });

  it("handles back navigation when back button is clicked", async () => {
    const user = userEvent.setup();
    render(<EditProductPage />);

    const backButton = screen.getByText("Edit Product").closest("div");
    await user.click(backButton!);

    expect(mockRouterBack).toHaveBeenCalled();
  });

  it("passes initial product data to ProductForm", () => {
    render(<EditProductPage />);

    expect(screen.getByTestId("initial-product")).toHaveTextContent(
      "Test Villa"
    );
  });

  it("handles product update and navigation", async () => {
    const user = userEvent.setup();
    render(<EditProductPage />);

    const updateButton = screen.getByRole("button", { name: "Update Product" });
    await user.click(updateButton);

    expect(mockUpdate).toHaveBeenCalledWith({
      ...mockProduct,
      name: "Updated Product Name",
    });
    expect(mockRouterBack).toHaveBeenCalled();
  });

  it("displays product not found when product doesn't exist", () => {
    mockUseParams.mockReturnValue({ id: "999" });

    render(<EditProductPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
    expect(screen.queryByText("Edit Product")).not.toBeInTheDocument();
  });

  it("handles undefined id parameter", () => {
    mockUseParams.mockReturnValue({ id: undefined });

    render(<EditProductPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("applies correct container styling", () => {
    render(<EditProductPage />);

    const container = screen.getByText("Edit Product").closest(".container");
    expect(container).toHaveClass("mx-auto", "py-8");
  });

  it("has proper page structure", () => {
    render(<EditProductPage />);

    const heading = screen.getByText("Edit Product");
    expect(heading).toHaveClass("text-2xl", "font-bold");

    const form = screen.getByTestId("product-form");
    expect(form).toBeInTheDocument();
  });

  it("finds product by string id correctly", () => {
    jest.mock("next/navigation", () => ({
      useParams: () => ({
        id: "1",
      }),
    }));

    render(<EditProductPage />);

    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByText("Test Villa")).toBeInTheDocument();
  });

  it("handles empty products array", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      add: jest.fn(),
      remove: jest.fn(),
      update: mockUpdate,
    });

    render(<EditProductPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("calls update with correct product data", async () => {
    const user = userEvent.setup();
    render(<EditProductPage />);

    const updateButton = screen.getByRole("button", { name: "Update Product" });
    await user.click(updateButton);

    expect(mockUpdate).toHaveBeenCalledTimes(1);
    expect(mockUpdate).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        name: "Updated Product Name",
        category: "Villa",
        price: 500000,
      })
    );
  });
});
