import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

describe("Button:", () => {
  test("renders with required props", () => {
    render(<Button>click</Button>);

    expect(screen.getByRole("button", { name: "click" })).toBeInTheDocument();
  });
});
