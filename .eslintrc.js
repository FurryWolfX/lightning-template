/*
 * @Author: wolfx
 * @Date: 2020-03-23 16:13:25
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true
    }
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint-config-alloy/typescript"],
  globals: {},
  rules: {
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "no-var": "error"
  }
};
