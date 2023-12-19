import { writeFile } from "fs/promises";

const getCssProperties = (tokens: Record<string, string>) =>
  Object.entries(tokens)
    .map(([key, value]) => `--${key}: ${value || "none"};`)
    .join("\n");

export const createCSSModulesConfig = (allThemes: Record<string, Record<string, string>>) => {
  const cssClasses = Object.entries(allThemes).reduce((prevValue, [name, tokens]) => {
    const cssProperties = getCssProperties(tokens);

    return prevValue.concat(`.${name} {\n${cssProperties}}\n\n`);
  }, "");

  const typeDeclarations = Object.keys(allThemes).reduce(
    (prevValue, currValue) => prevValue.concat(`readonly ${currValue}: string;`),
    "",
  );

  try {
    writeFile(`src/css-modules/themes.module.css`, cssClasses);
    writeFile(
      `src/css-modules/themes.module.css.d.ts`,
      `declare const styles: {${typeDeclarations}};\nexport = styles;`,
    );
    console.log(`generated src/css-modules/themes.module.css`);
  } catch (error) {
    console.log(error);
  }
};

export const createCSSModulesConfigWithLayer = (allThemes: Record<string, Record<string, string>>) => {
  const cssClasses = Object.entries(allThemes).reduce((prevValue, [name, tokens]) => {
    const cssProperties = getCssProperties(tokens);

    return prevValue.concat(`.${name} {\n${cssProperties}}\n\n`);
  }, "");

  const typeDeclarations = Object.keys(allThemes).reduce(
    (prevValue, currValue) => prevValue.concat(`readonly ${currValue}: string;`),
    "",
  );

  try {
    writeFile(`src/css-modules/themes.layer.module.css`, `@layer taytay-ui {${cssClasses}}`);
    writeFile(
      `src/css-modules/themes.layer.module.css.d.ts`,
      `declare const styles: {${typeDeclarations}};\nexport = styles;`,
    );
    console.log(`generated src/css-modules/themes.module.css`);
  } catch (error) {
    console.log(error);
  }
};