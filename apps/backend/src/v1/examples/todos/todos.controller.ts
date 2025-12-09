import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common"

import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { TodosService, type Todo } from "./todos.service"

@Controller({ path: "examples/todos", version: "1" })
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get()
	getTodos(): Todo[] {
		return this.todosService.findAll()
	}

	@Get(":id")
	getTodo(@Param("id") id: string): Todo {
		return this.todosService.findOne(Number(id))
	}

	@Post()
	createTodo(@Body() payload: CreateTodoDto): Todo {
		return this.todosService.create(payload)
	}

	@Put(":id")
	replaceTodo(@Param("id") id: string, @Body() payload: CreateTodoDto): Todo {
		return this.todosService.replace(Number(id), payload)
	}

	@Patch(":id")
	updateTodo(@Param("id") id: string, @Body() payload: UpdateTodoDto): Todo {
		return this.todosService.update(Number(id), payload)
	}

	@Delete(":id")
	removeTodo(@Param("id") id: string): void {
		return this.todosService.remove(Number(id))
	}
}
