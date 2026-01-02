import "dotenv/config"

import type { NextConfig } from "next"

// Import env files to validate at build time
import "./env"

/** @type {import("next").NextConfig} */
const config: NextConfig = {
	/** Enables hot reloading for local packages without a build step */
	// transpilePackages: [
	//   "@repo/api",
	//   "@repo/auth",
	//   "@repo/db",
	//   "@repo/ui",
	//   "@repo/validators",
	// ],

	typescript: { ignoreBuildErrors: true },
	reactCompiler: true,
}

export default config
