"use client";

import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

interface ReactThemeContextProps {
  /**
   * The theme name as a type-safe string. Does not correspond to the emitted, hashed css class name, if applicable.
   */
  theme: string;
  /**
   * React state-setter function to update the theme context state.
   */
  setTheme: Dispatch<SetStateAction<string>>;
  /**
   * The emitted, hashed (if applicable), css class that corresponds to the active theme. Used to access the theme class from the `useTheme` hook.
   */
  themeClass: string;
}

const ReactThemeContext = createContext<ReactThemeContextProps | undefined>(undefined);

interface ThemeProviderProps<UserProvidedThemes extends Record<string, string>> {
  /**
   * Children of the wrapper. Accepts React nodes or a function.
   */
  children: ReactNode | ((theme: keyof UserProvidedThemes) => ReactNode);
  /**
   * The theme name as a type-safe string. Does not correspond to the emitted, hashed css class name (if applicable)
   */
  defaultTheme: Extract<keyof UserProvidedThemes, string>;
  /**
   * The theme classes used to determine the theme. If present, can only select the theme from the themes present in the themeClasses object.
   * Using this option will disable automatic dynamic imports of themes, and all themes present will be present in the final bundle.
   */
  themeClasses: UserProvidedThemes;
}

export const ReactThemeProvider = <UserProvidedThemes extends Record<string, string>>({
  children,
  defaultTheme,
  themeClasses,
}: ThemeProviderProps<UserProvidedThemes>) => {
  const [theme, setTheme] = useState<string>(defaultTheme);
  const themeClass = themeClasses[theme] ?? "";

  return (
    <ReactThemeContext.Provider value={{ theme, setTheme, themeClass }}>
      {typeof children === "function" ? (
        children(themeClass)
      ) : (
        <div data-testid="theme-wrapper" className={themeClasses[theme]}>
          {children}
        </div>
      )}
    </ReactThemeContext.Provider>
  );
};

export const useReactTheme = () => {
  const context = useContext(ReactThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
