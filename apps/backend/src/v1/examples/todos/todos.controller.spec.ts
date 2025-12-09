import { TodosController } from "./todos.controller"
import { TodosService } from "./todos.service"

describe("TodosController (v1)", () => {
	let controller: TodosController
	let service: TodosService

	beforeEach(() => {
		service = new TodosService()
		controller = new TodosController(service)
	})

	it("returns todos from the service", () => {
		const todos = controller.getTodos()
		expect(todos).toHaveLength(2)
	})

	it("creates and retrieves a todo", () => {
		const created = controller.createTodo({ title: "From controller", completed: true })
		expect(created).toEqual(expect.objectContaining({ title: "From controller", completed: true }))
		expect(controller.getTodo(String(created.id))).toEqual(created)
	})

	it("supports full CRUD flow", () => {
		const created = controller.createTodo({ title: "CRUD", completed: false })

		const replaced = controller.replaceTodo(String(created.id), { title: "CRUD replaced", completed: true })
		expect(replaced).toEqual({ id: created.id, title: "CRUD replaced", completed: true })

		const patched = controller.updateTodo(String(created.id), { completed: false })
		expect(patched).toEqual({ id: created.id, title: "CRUD replaced", completed: false })

		controller.removeTodo(String(created.id))
		expect(() => controller.getTodo(String(created.id))).toThrow()
	})
})

