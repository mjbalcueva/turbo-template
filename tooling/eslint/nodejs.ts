import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint/config";
import globals from "globals";

export const nodejsConfig = defineConfig(
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "no-console": "off",
      "prettier/prettier": "error",
    },
  },
  // Prettier config last to disable stylistic rules that might conflict
  prettier,
);
