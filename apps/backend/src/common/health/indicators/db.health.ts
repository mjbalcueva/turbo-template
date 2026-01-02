import { Inject, Injectable } from "@nestjs/common"
import { type HealthIndicatorResult } from "@nestjs/terminus"
import { sql } from "drizzle-orm"

import { DB, type DBType } from "@/common/database/database.providers"

@Injectable()
export class DBHealthIndicator {
	constructor(@Inject(DB) private readonly db: DBType) {}
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
