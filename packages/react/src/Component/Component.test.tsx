import { render, screen } from "@testing-library/react";
import { Component } from "./Component";

describe("Component:", () => {
  test("renders with required props", () => {
    render(<Component />);

    expect(screen.getByText("Component")).toBeInTheDocument();
  });
});
