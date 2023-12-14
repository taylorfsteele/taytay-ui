import { coolTheme, funTheme } from "../tokens";

export const themes = {
  coolTheme,
  funTheme,
};

export type ThemeNames = keyof typeof themes;
export * from "./providers/react";
