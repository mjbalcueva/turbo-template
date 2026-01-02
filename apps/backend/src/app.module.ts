import { Module } from "@nestjs/common"
import { AuthModule } from "@thallesp/nestjs-better-auth"

import { auth } from "@repo/auth"

import { DatabaseModule } from "@/common/database/database.module"
import { HealthModule } from "@/common/health/health.module"
import { AppModule as V1AppModule } from "@/modules/v1/app.module"

@Module({
	imports: [
		DatabaseModule,
		HealthModule,
		AuthModule.forRoot({ auth }), // Better Auth integration
		V1AppModule,
	],
})
export class AppModule {}
