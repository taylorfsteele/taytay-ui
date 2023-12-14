import { writeFile } from "fs/promises";

const getCssProperties = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value || "none"};`)
    .join("\n");

export const createCSSModulesConfig = (tokens: Record<string, string>, name: string) => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(`src/css-modules/${name}.module.css`, `.${name} {\n${cssProperties}}\n`);
    writeFile(
      `src/css-modules/${name}.module.css.d.ts`,
      `declare const styles: {\nreadonly ${name}: string;\n};\nexport = styles;`,
    );
    console.log(`generated src/css-modules/${name}.module.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createCSSModulesConfigWithLayer = (tokens: Record<string, string>, name: string) => {
  const cssProperties = getCssProperties(tokens);

  try {
    writeFile(
      `src/css-modules/${name}.layer.module.css`,
      `@layer taytay-ui {\n.${name} {\n${cssProperties}}}`,
    );
    writeFile(
      `src/css-modules/${name}.layer.module.css.d.ts`,
      `declare const styles: {\nreadonly ${name}: string;\n};\nexport = styles;`,
    );
    console.log(`generated src/css-modules/${name}.layer.module.css`);
  } catch (error) {
    console.log(error);
  }
};
