import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import depsExternal from "rollup-plugin-node-externals";
import preserveDirectives from "rollup-plugin-preserve-directives";
import styles from "rollup-plugin-styles";

export default defineConfig([
  {
    input: ["src/index.ts"],
    onwarn(warning, warn) {
      // Ignore 'use client' directive warnings
      if (
        warning.code === "MODULE_LEVEL_DIRECTIVE" &&
        (warning.message.includes(`"use client"`) || warning.message.includes(`'use client'`))
      ) {
        return;
      }

      warn(warning);
    },
    plugins: [
      nodeResolve(),
      typescript({
        exclude: [
          "vite.config.ts",
          "src/**/*.stories.{ts,tsx}",
          "src/**/*.test.{ts,tsx}",
          "testSetup.ts",
          "./.storybook/*",
        ],
        inlineSourceMap: true,
      }),
      styles({
        modules: true,
        mode: "extract",
        namedExports: true,
      }),
      depsExternal(),
      preserveDirectives(),
    ],
    output: {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: "inline",
      exports: "named",
      assetFileNames: "styles/[name][extname]",
    },
  },
]);
