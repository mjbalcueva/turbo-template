import { type DBType } from "@/common/database/database.providers"

import { TodosController } from "./todos.controller"
import { TodosService } from "./todos.service"

describe("TodosController (v1)", () => {
	let controller: TodosController
	let service: TodosService

	beforeEach(() => {
		const mockDb = {} as DBType
		service = new TodosService(mockDb)
		controller = new TodosController(service)
	})

	it("returns todos decorated with apiVersion", async () => {
		const todos = await controller.getTodos()
		expect(todos).toHaveLength(2)
		expect(todos.every(todo => todo.apiVersion === "1")).toBe(true)
	})

	it("creates and returns versioned todo", async () => {
		const created = await controller.createTodo({ title: "Versioned", completed: true })
		expect(created).toEqual(
			expect.objectContaining({
				title: "Versioned",
				completed: true,
				apiVersion: "1",
			})
		)
	})

	it("propagates updates through service while preserving apiVersion", async () => {
		const created = await controller.createTodo({ title: "Updatable" })
		const replaced = await controller.replaceTodo(String(created.id), {
			title: "Replaced",
			completed: true,
		})
		expect(replaced.apiVersion).toBe("1")
		const patched = await controller.updateTodo(String(created.id), { completed: false })
		expect(patched).toEqual(
			expect.objectContaining({
				id: created.id,
				title: "Replaced",
				completed: false,
				apiVersion: "1",
			})
		)
	})
})
