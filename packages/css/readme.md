# TayTay CSS

<p align="center">
  <br/>
  TayTay CSS is a CSS Styling Solution Generator that connects design tokens to your favorite styling solution.
  <br />
</p>

# Features
- 🦄 Works with any CSS framework, even your favorite one!
- 🎨 Get a config for your framework pre-populated with design tokens
- 🐝 Provides options for modern CSS outputs and cascade layers via `@layer`
- 🚂 Exports theme providers for applicable supported frameworks
- ✨ High-level support for extending configs and simultaneous themes

# How to Use

The steps here will be:
1. Install the package `pnpm install @taytay-ui/css`
2. Pick the styling solution you want
3. Follow that soltion's setup steps 🤷

## How does this repo work?

This package exports both a bundled dist folder and the subfolders in the `src` directory. This is to maintain a git history of the configs, and to enable easy code generation for TayTay CLI.

These files are specific to each styling solution and can often have different files or options available to them.