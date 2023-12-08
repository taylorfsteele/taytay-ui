/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@taytay-ui/eslint-config/react-component-library.js", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["testSetup.ts", "storybook-static", "coverage"],
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
};
