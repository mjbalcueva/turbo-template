import { Inject, Injectable } from "@nestjs/common"
import { type HealthIndicatorResult } from "@nestjs/terminus"
import { sql } from "drizzle-orm"

import { DRIZZLE_DB, type DrizzleDb } from "../../database/drizzle.providers"

@Injectable()
export class DrizzleHealthIndicator {
	constructor(@Inject(DRIZZLE_DB) private readonly db: DrizzleDb) {}
	async pingCheck(key: string): Promise<HealthIndicatorResult> {
		try {
			await this.db.execute(sql`select 1`)
			return {
				[key]: { status: "up" },
			}
		} catch (error: unknown) {
			return {
				[key]: {
					status: "down",
					message: (error as Error)?.message ?? "database check failed",
				},
			}
		}
	}
}
