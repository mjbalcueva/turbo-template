import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import { schema, type Schema } from "./schema/index.js"

/**
 * Type for the Drizzle database client
 */
export type DrizzleClient = NodePgDatabase<Schema>

/**
 * Creates a PostgreSQL connection pool
 *
 * @param connectionString - Optional connection string. If not provided, uses POSTGRES_URL environment variable
 * @returns A PostgreSQL connection pool
 * @throws Error if connection string is not provided and POSTGRES_URL is not set
 */
export function createPool(connectionString?: string): Pool {
	const connString = connectionString ?? process.env.POSTGRES_URL
	if (!connString) {
		throw new Error("POSTGRES_URL environment variable is not set")
	}
	return new Pool({ connectionString: connString })
}

/**
 * Creates a Drizzle ORM client with the configured schema
 *
 * @param connectionString - Optional connection string. If not provided, uses POSTGRES_URL environment variable
 * @returns A Drizzle database client
 * @throws Error if connection string is not provided and POSTGRES_URL is not set
 */
export function createDrizzleClient(connectionString?: string): DrizzleClient {
	const pool = createPool(connectionString)
	return drizzle(pool, { schema })
}

/**
 * Creates a Drizzle ORM client from an existing pool
 *
 * @param pool - PostgreSQL connection pool
 * @returns A Drizzle database client
 */
export function createDrizzleClientFromPool(pool: Pool): DrizzleClient {
	return drizzle(pool, { schema })
}
