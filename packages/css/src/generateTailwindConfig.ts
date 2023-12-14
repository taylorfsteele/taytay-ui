import { writeFile } from "fs/promises";
import type { Config } from "tailwindcss";

const organizeColorTokens = (tokens: Record<string, string>) =>
  Object.entries(tokens).reduce((prevValue, [key, value]) => {
    if (!/\d/.test(key)) return { ...prevValue, [key]: value };
    const baseKey = key.replace(/\d.*/, "");
    const number = key.match(/\d+.*/)?.[0] ?? 100;
    const nestedColors = prevValue[baseKey as keyof typeof prevValue] as Record<string, string>;

    return {
      ...prevValue,
      [baseKey]: { ...nestedColors, [number]: value },
    };
  }, {});

export const createTailwindConfig = (colorTokens: Record<string, string>, name: string) => {
  const config: Partial<Config> = {
    theme: organizeColorTokens(colorTokens),
  };

  try {
    writeFile(`src/tailwind/${name}-tailwind-config.js`, `module.exports = ${JSON.stringify(config)}`);
    console.log(`generated src/tailwind/${name}-tailwind-config.js`);
  } catch (error) {
    console.log(error);
  }
};

const toCamelCase = (str: string) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));

export const createThemeTokenExports = (tokensByName: Record<string, Record<string, string>>) => {
  const colorTokensExports = Object.entries(tokensByName)
    .map(
      ([key, tokens]: [string, Record<string, string>]) =>
        `export const ${toCamelCase(key)}ThemeTokens = ${JSON.stringify(organizeColorTokens(tokens))}`,
    )
    .join("\n");

  try {
    writeFile(`src/tailwind/theme-tokens.js`, colorTokensExports);
    console.log(`generated src/tailwind/theme-tokens.js`);
  } catch (error) {
    console.log(error);
  }
};
