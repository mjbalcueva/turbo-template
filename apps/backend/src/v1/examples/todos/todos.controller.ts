import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common"

import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { TodosService, type Todo } from "./todos.service"

@Controller({ path: "examples/todos", version: "1" })
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	@Get()
	async getTodos(): Promise<Todo[]> {
		return await this.todosService.findAll()
	}

	@Get(":id")
	async getTodo(@Param("id") id: string): Promise<Todo> {
		return await this.todosService.findOne(Number(id))
	}

	@Post()
	async createTodo(@Body() payload: CreateTodoDto): Promise<Todo> {
		return await this.todosService.create(payload)
	}

	@Put(":id")
	async replaceTodo(@Param("id") id: string, @Body() payload: CreateTodoDto): Promise<Todo> {
		return await this.todosService.replace(Number(id), payload)
	}

	@Patch(":id")
	async updateTodo(@Param("id") id: string, @Body() payload: UpdateTodoDto): Promise<Todo> {
		return await this.todosService.update(Number(id), payload)
	}

	@Delete(":id")
	async removeTodo(@Param("id") id: string): Promise<void> {
		return await this.todosService.remove(Number(id))
	}
}
