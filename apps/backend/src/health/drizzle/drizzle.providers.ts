import { type Provider } from "@nestjs/common"
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

export const DRIZZLE_POOL = Symbol("DRIZZLE_POOL")
export const DRIZZLE_DB = Symbol("DRIZZLE_DB")

export type DrizzleDb = NodePgDatabase<Record<string, never>>

const createPool = () => {
	const connectionString = process.env.POSTGRES_URL
	if (!connectionString) {
		return null
	}
	return new Pool({ connectionString })
}

export const drizzleProviders: Provider[] = [
	{
		provide: DRIZZLE_POOL,
		useFactory: createPool,
	},
	{
		provide: DRIZZLE_DB,
		inject: [DRIZZLE_POOL],
		useFactory: (pool: Pool | null) => {
			if (!pool) {
				return null
			}
			return drizzle(pool)
		},
	},
]

