import "dotenv/config"
import { createJiti } from "jiti"

const jiti = createJiti(import.meta.url)

// Import env files to validate at build time. Use jiti so we can load .ts files in here.
await jiti.import("./env")

/** @type {import("next").NextConfig} */
const config = {
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
