"use client";

import { type ReactNode } from "react";

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, disabled, type }: ButtonProps) => {
  return (
    <button type={type} disabled={disabled}>
      {children}
    </button>
  );
};
