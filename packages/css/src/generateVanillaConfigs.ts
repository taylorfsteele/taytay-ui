import { writeFile } from "fs/promises";

const getCssProperties = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value || "none"};`)
    .join("\n");

export const createVanillaCSSConfig = (tokens: Record<string, string>, name: string = "") => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(`src/vanilla/${name}.css`, `:root {\n${cssProperties}}\n`);
    console.log(`generated src/vanilla/${name}.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createVanillaCSSConfigWithTheme = (tokens: Record<string, string>, name: string) => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(`src/vanilla/${name}.theme.css`, `:root[data-theme="${name}"] {\n${cssProperties}}\n`);
    console.log(`generated src/vanilla/${name}.theme.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createVanillaCSSConfigWithLayer = (tokens: Record<string, string>, name: string) => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(`src/vanilla/${name}.layer.css`, `@layer taytay-ui {\n:root {\n${cssProperties}}}`);
    console.log(`generated src/vanilla/${name}.layer.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createVanillaCSSConfigWithLayerWithTheme = (tokens: Record<string, string>, name: string) => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(
      `src/vanilla/${name}.theme.layer.css`,
      `@layer taytay-ui {\n:root[data-theme="${name}"] {\n${cssProperties}}}`,
    );
    console.log(`generated src/vanilla/${name}.theme.layer.css`);
  } catch (error) {
    console.log(error);
  }
};
