import { render, screen } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductDetailPage from "../page";
import { useProducts } from "../../../../hooks/useProducts";
import { useParams } from "next/navigation";
import { ProductStructuredDataProps } from "../../../../components/StructuredData";

// Mock dependencies
jest.mock("../../../../hooks/useProducts");
jest.mock("../ClientProductActions", () => {
  return function MockClientProductActions({ productId }: { productId: string }) {
    return (
      <div data-testid="client-product-actions">
        <button>Edit {productId}</button>
        <button>Delete {productId}</button>
      </div>
    );
  };
});
jest.mock("../../../../components/StructuredData", () => ({
  ProductStructuredData: ({ product }: ProductStructuredDataProps) => (
    <script data-testid="structured-data" type="application/ld+json">
      {JSON.stringify(product)}
    </script>
  ),
}));

const mockProduct = {
  id: "1",
  name: "Test Villa",
  category: "Villa",
  price: 500000,
  description: "A beautiful test villa with amazing features",
  imageUrl: "/test-villa.jpg",
};

const mockProducts = [mockProduct];


const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockRouterBack = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: mockRouterBack,
  }),
  useParams: jest.fn(),
}));

const mockUseParams = useParams as jest.MockedFunction<typeof useParams>;

describe("ProductDetailPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: mockProducts,
      remove: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
    });
    mockUseParams.mockReturnValue({ id: "1" });
  });

  it("renders product details correctly", () => {
    render(<ProductDetailPage />);

    expect(screen.getByRole("heading", { level: 1, name: "Product Details" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1, name: mockProduct.name })).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toLocaleString()}`)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
  });

  it("renders product image with correct attributes", () => {
    render(<ProductDetailPage />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);
    expect(image).toHaveAttribute("width", "600");
    expect(image).toHaveAttribute("height", "400");
    expect(image).toHaveClass("w-full", "h-96", "object-cover", "rounded");
  });

  it("renders structured data component", () => {
    render(<ProductDetailPage />);

    const structuredData = screen.getByTestId("structured-data");
    expect(structuredData).toBeInTheDocument();
    expect(structuredData).toHaveAttribute("type", "application/ld+json");
  });

  it("renders client product actions with correct product id", () => {
    render(<ProductDetailPage />);

    const actions = screen.getByTestId("client-product-actions");
    expect(actions).toBeInTheDocument();
    expect(screen.getByText("Edit 1")).toBeInTheDocument();
    expect(screen.getByText("Delete 1")).toBeInTheDocument();
  });

  it("handles back navigation when back button is clicked", async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    const backButton = screen.getByRole("heading", { name: "Product Details" }).closest("div");
    expect(backButton).toHaveClass("flex", "items-center", "mb-4", "gap-2", "cursor-pointer");

    await user.click(backButton!);
    expect(mockRouterBack).toHaveBeenCalled();
  });

  it("displays product not found when product doesn't exist", () => {
    mockUseParams.mockReturnValue({ id: "999" });
    
    render(<ProductDetailPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
    expect(screen.queryByText(mockProduct.name)).not.toBeInTheDocument();
    expect(screen.queryByTestId("client-product-actions")).not.toBeInTheDocument();
  });

  it("handles undefined id parameter", () => {
    mockUseParams.mockReturnValue({ id: undefined });
    
    render(<ProductDetailPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("applies correct CSS classes for layout", () => {
    render(<ProductDetailPage />);

    const container = screen.getByRole("heading", { name: "Product Details" }).closest(".container");
    expect(container).toHaveClass("mx-auto");

    const imageContainer = screen.getByAltText(mockProduct.name).closest("div");
    expect(imageContainer).toHaveClass("relative", "w-full", "md:w-1/2");
  });

  it("displays price with proper formatting", () => {
    const productWithLargePrice = {
      ...mockProduct,
      price: 1234567,
    };
    
    mockUseProducts.mockReturnValue({
      products: [productWithLargePrice],
      remove: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
    });

    render(<ProductDetailPage />);

    expect(screen.getByText("$1,234,567")).toBeInTheDocument();
  });

  it("has proper responsive layout classes", () => {
    render(<ProductDetailPage />);

    const flexContainer = screen.getByRole("heading", { name: mockProduct.name }).closest(".flex");
    expect(flexContainer).toHaveClass("flex", "flex-col", "md:flex-row", "gap-8");
  });

  it("renders back button with proper styling", () => {
    render(<ProductDetailPage />);

    const backSection = screen.getByRole("heading", { name: "Product Details" }).parentElement;
    expect(backSection).toHaveClass("flex", "items-center", "mb-4", "gap-2", "cursor-pointer");
  });

  it("renders product information in correct sections", () => {
    render(<ProductDetailPage />);

    // Check product name heading
    const productNameHeading = screen.getByRole("heading", { name: mockProduct.name });
    expect(productNameHeading).toHaveClass("text-3xl", "font-bold", "mb-4");

    // Check category styling
    const category = screen.getByText(mockProduct.category);
    expect(category).toHaveClass("text-gray-600", "mb-2", "text-lg");

    // Check price styling
    const price = screen.getByText(`$${mockProduct.price.toLocaleString()}`);
    expect(price).toHaveClass("text-blue-600", "font-bold", "mb-6", "text-2xl");

    // Check description styling
    const description = screen.getByText(mockProduct.description);
    expect(description).toHaveClass("mb-6", "text-gray-700", "leading-relaxed");
  });

  it("handles empty products array", () => {
    mockUseProducts.mockReturnValue({
      products: [],
      remove: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
    });
    
    render(<ProductDetailPage />);

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("renders image with proper Next.js Image attributes", () => {
    render(<ProductDetailPage />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("sizes", "(max-width: 768px) 100vw, 50vw");
    expect(image).toHaveAttribute("placeholder", "blur");
  });

  it("finds product by matching id correctly", () => {
    const multipleProducts = [
      { ...mockProduct, id: "1", name: "Product 1" },
      { ...mockProduct, id: "2", name: "Product 2" },
      { ...mockProduct, id: "3", name: "Product 3" },
    ];

    mockUseProducts.mockReturnValue({
      products: multipleProducts,
      remove: jest.fn(),
      add: jest.fn(),
      update: jest.fn(),
    });

    mockUseParams.mockReturnValue({ id: "2" });
    
    render(<ProductDetailPage />);

    expect(screen.getByRole("heading", { name: "Product 2" })).toBeInTheDocument();
    expect(screen.queryByText("Product 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
  });
});

