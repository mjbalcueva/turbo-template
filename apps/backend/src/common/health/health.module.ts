import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"

import { DatabaseModule } from "@/common/database/database.module"
import { DrizzleHealthIndicator } from "./drizzle/drizzle.health"
import { HealthController } from "./health.controller"
import { HealthService } from "./health.service"

@Module({
	imports: [TerminusModule, DatabaseModule],
	controllers: [HealthController],
	providers: [HealthService, DrizzleHealthIndicator],
})
export class HealthModule {}
