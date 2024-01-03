import { type HTMLAttributes, type ReactNode } from "react";
import { polymorphicForwardRef } from "../polymorphicForwardRef/polymorphicForwardRef";
import type { Colors, Variants } from "../types";
import { button } from "./Button.variants";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Button content.
   */
  children: ReactNode;
  /**
   * The color of the component, dictated by the current theme.
   */
  color?: Colors;
  /**
   * Determines if button is disabled.
   */
  disabled?: boolean;
  /**
   * Determines if button takes full width of container.
   */
  fullWidth?: boolean;
  /**
   * Determines size of component.
   * @defaultValue 'md'
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /**
   * The variant to use.
   */
  variant?: Variants;
}

export const Button = polymorphicForwardRef<"button", ButtonProps>(
  (
    {
      as: Component = "button",
      children,
      className,
      color = "primary",
      disabled = false,
      fullWidth = false,
      size = "md",
      variant = "solid",
      ...attributes
    },
    ref,
  ) => (
    <Component
      className={button({ disabled, className, color, fullWidth, variant, size })}
      ref={ref}
      {...attributes}
    >
      {children}
    </Component>
  ),
);

Button.displayName = "Button";