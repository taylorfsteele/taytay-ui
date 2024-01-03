import { cva } from "cva";
import type { HTMLAttributes, ReactNode } from "react";
import { polymorphicForwardRef } from "../polymorphicForwardRef/polymorphicForwardRef";
import type { Colors, Variants } from "../types";
import styles from "./Pill.module.css";

const { pill, sm, md, lg } = styles;

const pillVariants = cva({
  base: pill,
  variants: {
    size: {
      sm,
      md,
      lg,
    },
  },
});

export interface PillProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * The content of the component
   */
  children: ReactNode;
  /**
   * The color of the component, dictated by the current theme.
   */
  color?: Colors;
  /**
   * If `true`, the component is disabled.
   */
  disabled?: boolean;
  /**
   * Determines size of component.
   * @defaultValue 'md'
   */
  size?: "sm" | "md" | "lg";
  /**
   * The variant to use.
   */
  variant?: Variants;
}

export const Pill = polymorphicForwardRef<"span", PillProps>(
  ({ as: Component = "span", children, className, size = "md", ...attributes }, ref) => (
    <Component className={pillVariants({ className, size })} ref={ref} {...attributes}>
      <span className={styles.label}>{children}</span>
    </Component>
  ),
);

Pill.displayName = "Pill";
