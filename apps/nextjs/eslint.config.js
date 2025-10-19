import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@repo/eslint-config/base";
import { nextjsConfig } from "@repo/eslint-config/nextjs";
import { reactConfig } from "@repo/eslint-config/react";

/** @type {import("eslint").Linter.Config[]} */
export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);
