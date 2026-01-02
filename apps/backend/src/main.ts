import { ValidationPipe, VersioningType } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import { config } from "dotenv"

import { AppModule } from "./app.module"

// Load .env file from app directory
config()

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix("api")
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: "1",
	})
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		})
	)
	await app.listen(process.env.PORT ?? 3000)
}

bootstrap().catch(error => {
	console.error(error)
	process.exit(1)
})
