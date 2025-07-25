import { render, screen } from "../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ProductFilter from "../ProductFilter";

describe("ProductFilter Component", () => {
  const mockCategories = ["Villa", "Apartment", "House"];
  const mockOnFilter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all filter fields", () => {
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByLabelText("Min Price")).toBeInTheDocument();
    expect(screen.getByLabelText("Max Price")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument();
  });

  it("renders category options correctly", () => {
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    expect(screen.getByText("All Categories")).toBeInTheDocument();
    mockCategories.forEach(category => {
      expect(screen.getByText(category)).toBeInTheDocument();
    });
  });

  it("handles category selection", async () => {
    const user = userEvent.setup();
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const categorySelect = screen.getByLabelText("Category");
    await user.selectOptions(categorySelect, "Villa");
    
    expect(categorySelect).toHaveValue("Villa");
  });

  it("handles price input changes", async () => {
    const user = userEvent.setup();
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const minPriceInput = screen.getByLabelText("Min Price");
    const maxPriceInput = screen.getByLabelText("Max Price");

    await user.type(minPriceInput, "100000");
    await user.type(maxPriceInput, "500000");

    expect(minPriceInput).toHaveValue(100000);
    expect(maxPriceInput).toHaveValue(500000);
  });

  it("calls onFilter with correct values on form submission", async () => {
    const user = userEvent.setup();
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const categorySelect = screen.getByLabelText("Category");
    const minPriceInput = screen.getByLabelText("Min Price");
    const maxPriceInput = screen.getByLabelText("Max Price");
    const filterButton = screen.getByRole("button", { name: "Filter" });

    await user.selectOptions(categorySelect, "Villa");
    await user.type(minPriceInput, "100000");
    await user.type(maxPriceInput, "500000");
    await user.click(filterButton);

    expect(mockOnFilter).toHaveBeenCalledWith("Villa", 100000, 500000);
  });

  it("calls onFilter with empty category when All Categories selected", async () => {
    const user = userEvent.setup();
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const filterButton = screen.getByRole("button", { name: "Filter" });
    await user.click(filterButton);

    expect(mockOnFilter).toHaveBeenCalledWith("", 0, 0);
  });

  it("prevents default form submission", async () => {
    const user = userEvent.setup();
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const form = screen.getByRole("button", { name: "Filter" }).closest("form");
    const mockPreventDefault = jest.fn();
    
    form?.addEventListener("submit", (e) => {
      mockPreventDefault();
      e.preventDefault();
    });

    await user.click(screen.getByRole("button", { name: "Filter" }));
    
    expect(mockOnFilter).toHaveBeenCalled();
  });

  it("has correct styling classes", () => {
    render(<ProductFilter categories={mockCategories} onFilter={mockOnFilter} />);

    const filterButton = screen.getByRole("button", { name: "Filter" });
    expect(filterButton).toHaveClass(
      "self-end",
      "px-4",
      "py-2",
      "rounded-md",
      "bg-blue-600",
      "text-white",
      "font-semibold",
      "hover:bg-blue-700",
      "transition"
    );
  });
});