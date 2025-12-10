import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"

import { DrizzleHealthIndicator } from "./drizzle/drizzle.health"
import { drizzleProviders } from "./drizzle/drizzle.providers"
import { HealthController } from "./health.controller"
import { HealthService } from "./health.service"

@Module({
	imports: [TerminusModule],
	controllers: [HealthController],
	providers: [HealthService, DrizzleHealthIndicator, ...drizzleProviders],
})
export class HealthModule {}
