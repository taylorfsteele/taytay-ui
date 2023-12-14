/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@taytay-ui/eslint-config/react-component-library.js"],
  parser: "@typescript-eslint/parser",
  ignorePatterns: [],
  env: {
    node: true,
  },
  parserOptions: {
    project: "./tsconfig.json",
  },
};
