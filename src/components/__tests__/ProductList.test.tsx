import { render, screen, mockProducts } from "../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductList from "../ProductList";

describe("ProductList Component", () => {
  it("renders loading skeleton when loading is true", () => {
    render(<ProductList products={[]} loading />);

    const skeletons = screen.getAllByText("", { selector: ".skeleton" });
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders empty state when no products", () => {
    render(<ProductList products={[]} />);

    expect(screen.getByText("No products found")).toBeInTheDocument();
    expect(
      screen.getByText("Try adjusting your search or filter criteria")
    ).toBeInTheDocument();
  });

  it("renders products correctly", () => {
    render(<ProductList products={mockProducts} />);

    expect(screen.getByText("Showing 2 products")).toBeInTheDocument();
    expect(screen.getByText(mockProducts[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockProducts[1].name)).toBeInTheDocument();
  });

  it("renders singular product count correctly", () => {
    render(<ProductList products={[mockProducts[0]]} />);

    expect(screen.getByText("Showing 1 product")).toBeInTheDocument();
  });

  it("passes onDelete to ProductCard components", async () => {
    const mockOnDelete = jest.fn();
    const user = userEvent.setup();

    render(<ProductList products={mockProducts} onDelete={mockOnDelete} />);

    const deleteButtons = screen.getAllByText("Delete");
    await user.click(deleteButtons[0]);

    expect(mockOnDelete).toHaveBeenCalledWith(mockProducts[0].id);
  });

  it("sets priority for first 4 products", () => {
    const manyProducts = Array.from({ length: 6 }, (_, i) => ({
      ...mockProducts[0],
      id: `${i + 1}`,
      name: `Product ${i + 1}`,
    }));

    render(<ProductList products={manyProducts} />);

    // First 4 images should have eager loading
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("loading", "eager");
    expect(images[1]).toHaveAttribute("loading", "eager");
    expect(images[2]).toHaveAttribute("loading", "eager");
    expect(images[3]).toHaveAttribute("loading", "eager");
    expect(images[4]).toHaveAttribute("loading", "lazy");
    expect(images[5]).toHaveAttribute("loading", "lazy");
  });

  it("applies animation classes", () => {
    render(<ProductList products={mockProducts} />);

    const container = screen
      .getByText("Showing 2 products")
      .closest(".space-y-6");
    const grid = container?.querySelector(".animate-fade-in");
    expect(grid).toBeInTheDocument();
  });
});
