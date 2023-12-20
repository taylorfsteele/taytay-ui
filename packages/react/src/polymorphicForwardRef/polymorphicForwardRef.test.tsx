import { render, screen } from "@testing-library/react";
import { polymorphicForwardRef } from "./polymorphicForwardRef";
import { type HTMLAttributes } from "react";

const PolymorphicComponent = polymorphicForwardRef<"div", HTMLAttributes<HTMLDivElement>>(
  ({ as: Element = "div", ...props }, ref) => <Element ref={ref} {...props} />,
);

describe("polymorphicForwardRef:", () => {
  test("renders a tag matching the as prop", () => {
    render(
      <PolymorphicComponent as="a" href="nice">
        tacos
      </PolymorphicComponent>,
    );

    expect(screen.getByRole("link", { name: "tacos" })).toBeInTheDocument();
  });
});
