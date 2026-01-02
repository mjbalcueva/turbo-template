import { Module } from "@nestjs/common"
import { TerminusModule } from "@nestjs/terminus"

import { DBModule } from "@/common/database/database.module"

import { HealthController } from "./health.controller"
import { HealthService } from "./health.service"
import { DBHealthIndicator } from "./indicators/db.health"

@Module({
	imports: [TerminusModule, DBModule],
	controllers: [HealthController],
	providers: [HealthService, DBHealthIndicator],
})
export class HealthModule {}
