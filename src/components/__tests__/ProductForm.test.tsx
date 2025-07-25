import { render, screen, mockProduct } from "../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductForm from "../ProductForm";

describe("ProductForm Component", () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ProductForm onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Product" })
    ).toBeInTheDocument();
  });

  it("renders with initial values when provided", () => {
    render(<ProductForm initial={mockProduct} onSubmit={mockOnSubmit} />);

    expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockProduct.description)
    ).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(mockProduct.price.toString())
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockProduct.imageUrl)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Update Product" })
    ).toBeInTheDocument();
  });

  it("handles form input changes", async () => {
    const user = userEvent.setup();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText("Name");

    await user.type(nameInput, "New Product");

    expect(nameInput).toHaveValue("New Product");

    const priceInput = screen.getByLabelText("Price");
    await user.type(priceInput, "100");
    expect(priceInput).toHaveValue(100);
  });

  it("submits form with correct data", async () => {
    const user = userEvent.setup();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    await user.type(screen.getByLabelText("Name"), "Test Product");
    await user.type(screen.getByLabelText("Description"), "Test Description");
    await user.type(screen.getByLabelText("Price"), "500");
    await user.type(screen.getByLabelText("Category"), "Test Category");
    await user.type(screen.getByLabelText("Image URL"), "/test.jpg");

    await user.click(screen.getByRole("button", { name: "Add Product" }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      id: expect.any(String),
      name: "Test Product",
      description: "Test Description",
      price: 500,
      category: "Test Category",
      imageUrl: "/test.jpg",
    });
  });

  it("prevents form submission when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<ProductForm onSubmit={mockOnSubmit} />);

    await user.click(screen.getByRole("button", { name: "Add Product" }));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it("updates existing product when initial data provided", async () => {
    const user = userEvent.setup();
    render(<ProductForm initial={mockProduct} onSubmit={mockOnSubmit} />);

    const nameInput = screen.getByLabelText("Name");
    await user.clear(nameInput);

    await user.type(nameInput, "Updated Product");

    await user.click(screen.getByRole("button", { name: "Update Product" }));

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...mockProduct,
      name: "Updated Product",
    });
  });
});
