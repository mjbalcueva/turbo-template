import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from "@nestjs/common"

import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"
import { TodosService, type Todo } from "./todos.service"

type TodoV2 = Todo & { apiVersion: "2" }

@Controller({ path: "examples/todos", version: "2" })
export class TodosController {
	constructor(private readonly todosService: TodosService) {}

	private addVersion(todo: Todo): TodoV2 {
		return { ...todo, apiVersion: "2" }
	}

	@Get()
	async getTodos(): Promise<TodoV2[]> {
		const todos = await this.todosService.findAll()
		return todos.map(todo => this.addVersion(todo))
	}

	@Get(":id")
	async getTodo(@Param("id") id: string): Promise<TodoV2> {
		const todo = await this.todosService.findOne(Number(id))
		return this.addVersion(todo)
	}

	@Post()
	async createTodo(@Body() payload: CreateTodoDto): Promise<TodoV2> {
		const todo = await this.todosService.create(payload)
		return this.addVersion(todo)
	}

	@Put(":id")
	async replaceTodo(@Param("id") id: string, @Body() payload: CreateTodoDto): Promise<TodoV2> {
		const todo = await this.todosService.replace(Number(id), payload)
		return this.addVersion(todo)
	}

	@Patch(":id")
	async updateTodo(@Param("id") id: string, @Body() payload: UpdateTodoDto): Promise<TodoV2> {
		const todo = await this.todosService.update(Number(id), payload)
		return this.addVersion(todo)
	}

	@Delete(":id")
	async removeTodo(@Param("id") id: string): Promise<void> {
		return await this.todosService.remove(Number(id))
	}
}
