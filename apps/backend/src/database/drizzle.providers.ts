import { type InjectionToken } from "@nestjs/common"
import type { Pool } from "pg"

import type { DrizzleClient } from "@repo/db/client"

/**
 * Injection token for the Drizzle database client
 */
export const DRIZZLE_DB = Symbol("DRIZZLE_DB") as InjectionToken<DrizzleDb>

/**
 * Injection token for the PostgreSQL connection pool
 */
export const DRIZZLE_POOL = Symbol("DRIZZLE_POOL") as InjectionToken<Pool>

/**
 * Type alias for the Drizzle database client
 * This is the type that should be injected in services
 */
export type DrizzleDb = DrizzleClient
