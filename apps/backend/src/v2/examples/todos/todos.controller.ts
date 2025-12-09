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
	getTodos(): TodoV2[] {
		return this.todosService.findAll().map(todo => this.addVersion(todo))
	}

	@Get(":id")
	getTodo(@Param("id") id: string): TodoV2 {
		return this.addVersion(this.todosService.findOne(Number(id)))
	}

	@Post()
	createTodo(@Body() payload: CreateTodoDto): TodoV2 {
		return this.addVersion(this.todosService.create(payload))
	}

	@Put(":id")
	replaceTodo(@Param("id") id: string, @Body() payload: CreateTodoDto): TodoV2 {
		return this.addVersion(this.todosService.replace(Number(id), payload))
	}

	@Patch(":id")
	updateTodo(@Param("id") id: string, @Body() payload: UpdateTodoDto): TodoV2 {
		return this.addVersion(this.todosService.update(Number(id), payload))
	}

	@Delete(":id")
	removeTodo(@Param("id") id: string): void {
		return this.todosService.remove(Number(id))
	}
}
