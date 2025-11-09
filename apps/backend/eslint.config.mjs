import { baseConfig } from "@repo/eslint-config/base"
import { nodejsConfig } from "@repo/eslint-config/nodejs"
import { defineConfig } from "eslint/config"

export default defineConfig(
	{
		ignores: ["eslint.config.mjs", "dist/**"],
	},
	baseConfig,
	nodejsConfig,
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn",
		},
	}
)
