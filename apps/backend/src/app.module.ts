import { Module } from "@nestjs/common"

import { DatabaseModule } from "@/common/database/database.module"
import { HealthModule } from "@/common/health/health.module"
import { AppModule as V1AppModule } from "@/modules/v1/app.module"

@Module({
	imports: [DatabaseModule, HealthModule, V1AppModule],
})
export class AppModule {}
