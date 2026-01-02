import { Module } from "@nestjs/common"

import { DBModule } from "@/common/database/database.module"

import { TodosController } from "./todos.controller"
import { TodosService } from "./todos.service"

@Module({
	imports: [DBModule],
	controllers: [TodosController],
	providers: [TodosService],
})
export class TodosModule {}
