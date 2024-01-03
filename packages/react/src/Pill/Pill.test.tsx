import { render, screen } from "@testing-library/react";
import { Pill } from "./Pill";

describe("Pill:", () => {
  test("renders with required props", () => {
    render(<Pill>pill</Pill>);

    expect(screen.getByText("pill")).toBeInTheDocument();
  });
});
