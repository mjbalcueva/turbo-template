/// <reference types="./types.d.ts" />

import type { ESLint, Linter } from "eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export const reactConfig = defineConfig({
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    react: react as ESLint.Plugin,
    "react-hooks": reactHooks as ESLint.Plugin,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    ...(react.configs.recommended.rules as Linter.RulesRecord),
    ...(reactHooks.configs.recommended.rules as Linter.RulesRecord),
  },
});
