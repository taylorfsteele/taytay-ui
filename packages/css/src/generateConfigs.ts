import { createCSSModulesConfig, createCSSModulesConfigWithLayer } from "./generateCssModulesConfig";
import { createThemeTokenExports, createTailwindConfig } from "./generateTailwindConfig";
import {
  createVanillaCSSConfig,
  createVanillaCSSConfigWithLayer,
  createVanillaCSSConfigWithLayerWithTheme,
  createVanillaCSSConfigWithTheme,
} from "./generateVanillaConfigs";
import { themes } from "./index";

// Colors
for (const themeName in themes) {
  const tokenValues = themes[themeName as keyof typeof themes];

  // Vanilla
  createVanillaCSSConfig(tokenValues, themeName);
  createVanillaCSSConfigWithTheme(tokenValues, themeName);
  createVanillaCSSConfigWithLayer(tokenValues, themeName);
  createVanillaCSSConfigWithLayerWithTheme(tokenValues, themeName);

  // CSS Modules
  createCSSModulesConfig(tokenValues, themeName);
  createCSSModulesConfigWithLayer(tokenValues, themeName);

  // Tailwind
  createTailwindConfig(tokenValues, themeName);
}

createThemeTokenExports(themes);
