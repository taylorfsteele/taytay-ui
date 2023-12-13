import { writeFile } from "fs/promises";

export const createCSSModulesConfig = (tokens: Record<string, string>, name: string = "") => {
  let cssProperties = "";
  for (let [key, value] of Object.entries(tokens)) {
    cssProperties += `--${key}: ${value || "none"};\n`;
  }

  try {
    writeFile(`src/css-modules/${name}.module.css`, `.${name} {\n${cssProperties}}\n`);
    console.log(`generated src/css-modules/${name}.module.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createCSSModulesConfigWithLayer = (tokens: Record<string, string>, name: string) => {
  let cssProperties = "";
  for (let [key, value] of Object.entries(tokens)) {
    cssProperties += `--${key}: ${value || "none"};\n`;
  }

  try {
    writeFile(
      `src/css-modules/${name}.layer.module.css`,
      `@layer taytay-ui {\n.${name} {\n${cssProperties}}}`,
    );
    console.log(`generated src/css-modules/${name}.layer.module.css`);
  } catch (error) {
    console.log(error);
  }
};
