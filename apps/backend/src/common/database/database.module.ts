import { Global, Inject, Module, type OnModuleDestroy } from "@nestjs/common"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"

import { schema } from "@repo/db/schema"

import { DRIZZLE_DB, DRIZZLE_POOL, type DrizzleDb } from "./drizzle.providers"

/**
 * Global NestJS module that provides Drizzle ORM database client and connection pool.
 *
 * This module should be imported once in your root AppModule.
 * It provides:
 * - DRIZZLE_DB: The Drizzle database client (injectable, required)
 * - DRIZZLE_POOL: The PostgreSQL connection pool (injectable, required)
 *
 * The connection pool is automatically closed when the module is destroyed.
 *
 * Requires POSTGRES_URL environment variable to be set.
 *
 * @example
 * ```typescript
 * import { DatabaseModule } from "./database/database.module"
 *
 * @Module({
 *   imports: [DatabaseModule],
 * })
 * export class AppModule {}
 * ```
 */
@Global()
@Module({
	providers: [
		{
			provide: DRIZZLE_POOL,
			useFactory: (): Pool => {
				const connectionString = process.env.POSTGRES_URL
				if (!connectionString) {
					throw new Error("POSTGRES_URL environment variable is required when using DatabaseModule")
				}
				return new Pool({ connectionString })
			},
		},
		{
			provide: DRIZZLE_DB,
			inject: [DRIZZLE_POOL],
			useFactory: (pool: Pool): DrizzleDb => {
				return drizzle(pool, { schema })
			},
		},
	],
	exports: [DRIZZLE_DB, DRIZZLE_POOL],
})
export class DatabaseModule implements OnModuleDestroy {
	constructor(@Inject(DRIZZLE_POOL) private readonly pool: Pool) {}

	async onModuleDestroy(): Promise<void> {
		await this.pool.end()
	}
}
