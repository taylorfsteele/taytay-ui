import { createCSSModulesConfig, createCSSModulesConfigWithLayer } from "./src/generateCssModulesConfig";
import { createThemeTokenExports, createTailwindConfig } from "./src/generateTailwindConfig";
import {
  createVanillaCSSConfig,
  createVanillaCSSConfigWithLayer,
  createVanillaCSSConfigWithLayerWithTheme,
  createVanillaCSSConfigWithTheme,
} from "./src/generateVanillaConfigs";
import { tokens } from "./tokens";

// Vanilla
createVanillaCSSConfig(tokens, "taytay-ui-default");
createVanillaCSSConfigWithTheme(tokens, "taytay-ui-default");
createVanillaCSSConfigWithLayer(tokens, "taytay-ui-default");
createVanillaCSSConfigWithLayerWithTheme(tokens, "taytay-ui-default");

// // CSS Modules
createCSSModulesConfig(tokens, "taytayUiDefault");
createCSSModulesConfigWithLayer(tokens, "taytayUiDefault");

// // Tailwind
createTailwindConfig(tokens, "taytay-ui-default");
createThemeTokenExports({ default: tokens });
