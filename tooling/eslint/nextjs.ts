import type { ESLint, Linter } from "eslint";
import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import eslintNextPlugin from "@next/eslint-plugin-next";
import { defineConfig } from "eslint/config";

// Fix up the plugin to work with flat config
const nextPlugin = fixupPluginRules(eslintNextPlugin as ESLint.Plugin);

export const nextjsConfig = defineConfig({
  files: ["**/*.ts", "**/*.tsx"],
  plugins: {
    "@next/next": nextPlugin,
  },
  rules: {
    ...Object.fromEntries(
      Object.entries(
        eslintNextPlugin.configs.recommended.rules as Linter.RulesRecord,
      ),
    ),
    // Disable react-in-jsx-scope for Next.js since it uses the new JSX transform
    "react/react-in-jsx-scope": "off",
  },
});
