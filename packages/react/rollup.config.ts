import nodeResolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import depsExternal from "rollup-plugin-node-externals";
import preserveDirectives from "rollup-plugin-preserve-directives";

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
      depsExternal(),
      nodeResolve(),
      typescript({
        exclude: ["vite.config.ts", "src/**/*.stories.{ts,tsx}", "src/**/*.test.{ts,tsx}"],
        inlineSourceMap: true,
      }),
      preserveDirectives(),
    ],
    output: {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
      sourcemap: "inline",
      exports: "named",
    },
  },
]);
