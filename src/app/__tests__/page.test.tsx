import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../page";

// Mock the HomePage component
jest.mock("../home/page", () => {
  return function MockHomePage() {
    return <div data-testid="home-page">Home Page Content</div>;
  };
});

describe("Home Page", () => {
  it("renders HomePage component", () => {
    render(<Home />);
    
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByText("Home Page Content")).toBeInTheDocument();
  });

  it("wraps HomePage in a div", () => {
    render(<Home />);
    
    const wrapper = screen.getByTestId("home-page").parentElement;
    expect(wrapper?.tagName).toBe("DIV");
  });
});