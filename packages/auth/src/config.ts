import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"

import { createDBClient } from "@repo/db/client"

/**
 * Creates a Better Auth instance configured with Drizzle adapter.
 *
 * The auth instance uses the database connection from @repo/db and is
 * configured to work across multiple apps (backend, web, mobile via API).
 *
 * @returns Better Auth instance
 */
export function createAuth(): ReturnType<typeof betterAuth> {
	const db = createDBClient()

	return betterAuth({
		database: drizzleAdapter(db, {
			provider: "pg", // PostgreSQL
		}),
		basePath: "/api/auth",
		baseURL:
			process.env.BETTER_AUTH_URL ??
			process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
			"http://localhost:3001",
		secret: process.env.BETTER_AUTH_SECRET ?? process.env.AUTH_SECRET,
		emailAndPassword: {
			enabled: true,
			requireEmailVerification: false, // Can be enabled later
		},
		trustedOrigins: process.env.BETTER_AUTH_TRUSTED_ORIGINS
			? process.env.BETTER_AUTH_TRUSTED_ORIGINS.split(",")
			: undefined,
	})
}

/**
 * Default Better Auth instance.
 * This is the shared instance used across all apps.
 */
export const auth: ReturnType<typeof betterAuth> = createAuth()
