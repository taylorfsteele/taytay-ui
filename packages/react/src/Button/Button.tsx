"use client";

import { type ReactNode } from "react";
import "@taytay-ui/css/vanilla/taytay-ui-default.css";

export interface ButtonProps {
  children: ReactNode;
}

export const Button = ({ children }: ButtonProps) => {
  return <button>{children}</button>;
};
