import { Injectable, NotFoundException } from "@nestjs/common"

import { CreateTodoDto } from "./dto/create-todo.dto"
import { UpdateTodoDto } from "./dto/update-todo.dto"

export type Todo = {
	id: number
	title: string
	completed: boolean
}

@Injectable()
export class TodosService {
	private todos: Todo[] = [
		{ id: 1, title: "First todo example", completed: false },
		{ id: 2, title: "Second todo example", completed: true },
	]

	findAll(): Todo[] {
		return this.todos
	}

	create(payload: CreateTodoDto): Todo {
		const todo: Todo = {
			id: this.todos.length ? Math.max(...this.todos.map(t => t.id)) + 1 : 1,
			title: payload.title,
			completed: payload.completed ?? false,
		}
		this.todos = [...this.todos, todo]
		return todo
	}

	findOne(id: number): Todo {
		const todo = this.todos.find(item => item.id === id)
		if (!todo) {
			throw new NotFoundException(`Todo ${id} not found`)
		}
		return todo
	}

	replace(id: number, payload: CreateTodoDto): Todo {
		this.findOne(id)
		const next: Todo = { id, title: payload.title, completed: payload.completed ?? false }
		this.todos = this.todos.map(item => (item.id === id ? next : item))
		return next
	}

	update(id: number, payload: UpdateTodoDto): Todo {
		const existing = this.findOne(id)
		const next: Todo = {
			...existing,
			...("title" in payload ? { title: payload.title ?? existing.title } : {}),
			...("completed" in payload ? { completed: payload.completed ?? false } : {}),
		}
		this.todos = this.todos.map(item => (item.id === id ? next : item))
		return next
	}

	remove(id: number): void {
		this.findOne(id)
		this.todos = this.todos.filter(item => item.id !== id)
	}
}

