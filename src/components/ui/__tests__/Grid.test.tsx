import { render, screen } from "../../../utils/test-utils";
import Grid from "../Grid";

describe("Grid Component", () => {
  it("renders children correctly", () => {
    render(
      <Grid>
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );

    expect(screen.getByText("Child 1")).toBeInTheDocument();
    expect(screen.getByText("Child 2")).toBeInTheDocument();
  });

  it("applies default grid classes", () => {
    render(
      <Grid>
        <div>Content</div>
      </Grid>
    );

    const grid = screen.getByText("Content").parentElement;
    expect(grid).toHaveClass(
      "grid",
      "gap-6",
      "grid-cols-1",
      "md:grid-cols-2",
      "lg:grid-cols-3"
    );
  });

  it("applies custom column configuration", () => {
    render(
      <Grid cols={{ default: 2, sm: 3, md: 4, lg: 5, xl: 6 }}>
        <div>Content</div>
      </Grid>
    );

    const grid = screen.getByText("Content").parentElement;
    expect(grid).toHaveClass(
      "grid-cols-2",
      "sm:grid-cols-3",
      "md:grid-cols-4",
      "lg:grid-cols-5",
      "xl:grid-cols-6"
    );
  });

  it("applies custom gap", () => {
    render(
      <Grid gap={4}>
        <div>Content</div>
      </Grid>
    );

    const grid = screen.getByText("Content").parentElement;
    expect(grid).toHaveClass("gap-4");
  });

  it("applies custom className", () => {
    render(
      <Grid className="custom-grid-class">
        <div>Content</div>
      </Grid>
    );

    const grid = screen.getByText("Content").parentElement;
    expect(grid).toHaveClass("custom-grid-class");
  });

  it("handles partial column configuration", () => {
    render(
      <Grid cols={{ md: 3 }}>
        <div>Content</div>
      </Grid>
    );

    const grid = screen.getByText("Content").parentElement;
    expect(grid).toHaveClass("md:grid-cols-3");
    expect(grid).not.toHaveClass("grid-cols-1"); // default should not apply when not specified
  });
});
