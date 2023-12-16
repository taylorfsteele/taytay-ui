"use client";

import { type ReactNode } from "react";

export interface ButtonProps {
  disabled?: boolean;
  children: ReactNode;
}

export const Button = ({ children, disabled }: ButtonProps) => {
  return <button disabled={disabled}>{children}</button>;
};
