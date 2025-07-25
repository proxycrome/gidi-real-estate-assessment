import { render, screen, mockProduct } from "../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductCard from "../ProductCard";

// Mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("ProductCard Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders product information correctly", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(
      screen.getByText(`$${mockProduct.price.toLocaleString()}`)
    ).toBeInTheDocument();

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProduct.imageUrl);
  });

  it("renders product link correctly", () => {
    render(<ProductCard product={mockProduct} />);

    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveAttribute("href", `/product/${mockProduct.id}`);
    });
  });

  it("renders edit and delete buttons when onDelete is provided", () => {
    const mockOnDelete = jest.fn();
    render(<ProductCard product={mockProduct} onDelete={mockOnDelete} />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("does not render edit and delete buttons when onDelete is not provided", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.queryByText("Edit")).not.toBeInTheDocument();
    expect(screen.queryByText("Delete")).not.toBeInTheDocument();
  });

  it("calls onDelete when delete button is clicked", async () => {
    const mockOnDelete = jest.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onDelete={mockOnDelete} />);

    await user.click(screen.getByText("Delete"));
    expect(mockOnDelete).toHaveBeenCalledWith(mockProduct.id);
  });

  it("navigates to edit page when edit button is clicked", async () => {
    const mockOnDelete = jest.fn();
    const user = userEvent.setup();

    render(<ProductCard product={mockProduct} onDelete={mockOnDelete} />);

    await user.click(screen.getByText("Edit"));
    expect(mockPush).toHaveBeenCalledWith(`/edit-product/${mockProduct.id}`);
  });

  it("applies priority loading for images", () => {
    render(<ProductCard product={mockProduct} priority />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("loading", "eager");
  });

  it("applies lazy loading by default", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("loading", "lazy");
  });

  it("applies custom className", () => {
    render(<ProductCard product={mockProduct} className="custom-class" />);

    const card = screen.getByText(mockProduct.name).closest(".card");
    expect(card).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText(mockProduct.name);
    expect(image).toHaveAttribute("alt", mockProduct.name);

    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent(mockProduct.name);
  });
});
