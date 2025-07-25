import { render, screen } from "../../../../utils/test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import ClientProductActions from "../ClientProductActions";
import { useProducts } from "../../../../hooks/useProducts";

jest.mock("../../../../hooks/useProducts");

const mockUseProducts = useProducts as jest.MockedFunction<typeof useProducts>;
const mockRemove = jest.fn();
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  })
}));

describe("ClientProductActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseProducts.mockReturnValue({
      products: [],
      add: jest.fn(),
      remove: mockRemove,
      update: jest.fn(),
    });
  });

  it("renders edit and delete buttons", () => {
    render(<ClientProductActions productId="123" />);

    expect(screen.getByText("Edit")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
  });

  it("renders edit button as a link with correct href", () => {
    render(<ClientProductActions productId="123" />);

    const editLink = screen.getByText("Edit").closest("a");
    expect(editLink).toHaveAttribute("href", "/edit-product/123");
  });

  it("applies correct styling to edit button", () => {
    render(<ClientProductActions productId="123" />);

    const editButton = screen.getByText("Edit");
    expect(editButton).toHaveClass(
      "px-3",
      "py-1",
      "rounded",
      "bg-blue-600",
      "text-white",
      "text-sm",
      "font-medium",
      "hover:bg-blue-700",
      "transition"
    );
  });

  it("applies correct styling to delete button", () => {
    render(<ClientProductActions productId="123" />);

    const deleteButton = screen.getByText("Delete");
    expect(deleteButton).toHaveClass(
      "px-3",
      "py-1",
      "rounded",
      "bg-red-600",
      "text-white",
      "text-sm",
      "font-medium",
      "hover:bg-red-700",
      "transition"
    );
  });

  it("applies correct container styling", () => {
    render(<ClientProductActions productId="123" />);

    const container = screen.getByText("Edit").closest("div");
    expect(container).toHaveClass("flex", "gap-2");
  });

  it("calls remove and navigates to home when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<ClientProductActions productId="123" />);

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledWith("123");
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("handles different product IDs correctly", async () => {
    const user = userEvent.setup();
    render(<ClientProductActions productId="456" />);

    const editLink = screen.getByText("Edit").closest("a");
    expect(editLink).toHaveAttribute("href", "/edit-product/456");

    const deleteButton = screen.getByText("Delete");
    await user.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledWith("456");
  });

  it("renders as button elements with correct types", () => {
    render(<ClientProductActions productId="123" />);

    const editElement = screen.getByText("Edit");
    const deleteElement = screen.getByText("Delete");

    // Edit should be inside a link (anchor tag)
    expect(editElement.closest("a")).toBeInTheDocument();
    
    // Delete should be a button
    expect(deleteElement.tagName).toBe("BUTTON");
  });

  it("handles click events properly", async () => {
    const user = userEvent.setup();
    render(<ClientProductActions productId="test-id" />);

    // Test delete button click
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await user.click(deleteButton);

    expect(mockRemove).toHaveBeenCalledTimes(1);
    expect(mockRemove).toHaveBeenCalledWith("test-id");
    expect(mockRouterPush).toHaveBeenCalledTimes(1);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("has proper accessibility attributes", () => {
    render(<ClientProductActions productId="123" />);

    const editLink = screen.getByRole("link", { name: "Edit" });
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    expect(editLink).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it("handles keyboard navigation", async () => {
    const user = userEvent.setup();
    render(<ClientProductActions productId="123" />);

    // Tab to edit link
    await user.tab();
    expect(screen.getByText("Edit")).toHaveFocus();

    // Tab to delete button
    await user.tab();
    expect(screen.getByText("Delete")).toHaveFocus();

    // Press Enter on delete button
    await user.keyboard("{Enter}");
    expect(mockRemove).toHaveBeenCalledWith("123");
  });

  it("maintains proper component structure", () => {
    render(<ClientProductActions productId="123" />);

    const container = screen.getByText("Edit").parentElement;
    const editLink = screen.getByText("Edit").closest("a");
    const deleteButton = screen.getByRole("button", { name: "Delete" });

    // Container should have both elements
    expect(container).toContainElement(editLink);
    expect(container).toContainElement(deleteButton);
  });
});