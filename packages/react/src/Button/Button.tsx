"use client";

import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};
