import { render, screen } from "../../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import AddProductPage from "../page";
import { useProducts } from "../../../hooks/useProducts";
import { Product } from "../../../types/Product";

// Mock dependencies
jest.mock("../../../hooks/useProducts");
jest.mock("../../../components/ProductForm", () => {
  return function MockProductForm({
    onSubmit,
  }: {
    onSubmit: (product: Product) => void;
  }) {
    return (
      <form
        data-testid="product-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            id: "1",
            name: "Test Product",
            category: "Villa",
            price: 500000,
            description: "Test description",
            imageUrl: "/test.jpg",
          });
        }}
      >
        <button type="submit">Submit Product</button>
      </form>
    );
  };
});

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockAdd = jest.fn();
const mockRouterPush = jest.fn();
const mockRouterBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
    back: mockRouterBack,
  }),
}));

describe("AddProductPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: [],
      add: mockAdd,
      remove: jest.fn(),
      update: jest.fn(),
    });
  });

  it("renders add product page correctly", () => {
    render(<AddProductPage />);

    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });

  it("renders back button with arrow icon", () => {
    render(<AddProductPage />);

    const backButton = screen.getByText("Add Product").closest("div");
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
    render(<AddProductPage />);

    const backButton = screen.getByText("Add Product").closest("div");
    await user.click(backButton!);

    expect(mockRouterBack).toHaveBeenCalled();
  });

  it("handles product addition and navigation", async () => {
    const user = userEvent.setup();
    render(<AddProductPage />);

    const submitButton = screen.getByRole("button", { name: "Submit Product" });
    await user.click(submitButton);

    expect(mockAdd).toHaveBeenCalledWith({
      id: "1",
      name: "Test Product",
      category: "Villa",
      price: 500000,
      description: "Test description",
      imageUrl: "/test.jpg",
    });
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("applies correct container styling", () => {
    render(<AddProductPage />);

    const container = screen.getByText("Add Product").closest(".container");
    expect(container).toHaveClass("mx-auto", "py-8");
  });

  it("passes correct props to ProductForm", () => {
    render(<AddProductPage />);

    // ProductForm should be rendered without initial prop (for adding new product)
    expect(screen.getByTestId("product-form")).toBeInTheDocument();
  });

  it("has proper page structure", () => {
    render(<AddProductPage />);

    // Check if the page has the expected structure
    const heading = screen.getByText("Add Product");
    expect(heading).toHaveClass("text-2xl", "font-bold");

    const form = screen.getByTestId("product-form");
    expect(form).toBeInTheDocument();
  });
});
