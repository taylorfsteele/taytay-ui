import { blueTheme, orangeTheme } from "../tokens";

export const themes = {
  blueTheme,
  orangeTheme,
};

export type ThemeNames = keyof typeof themes;
export * from "./providers/react";
