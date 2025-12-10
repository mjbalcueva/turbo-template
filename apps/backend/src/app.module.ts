import { Module } from "@nestjs/common"

import { AppModule as V1AppModule } from "./v1/app.module"
import { AppModule as V2AppModule } from "./v2/app.module"
import { HealthModule } from "./health/health.module"

@Module({
	imports: [HealthModule, V1AppModule, V2AppModule],
})
export class AppModule {}
