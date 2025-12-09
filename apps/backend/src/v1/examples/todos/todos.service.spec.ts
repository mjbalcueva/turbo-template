import { NotFoundException } from "@nestjs/common"

import { TodosService } from "./todos.service"

describe("TodosService (v1)", () => {
	let service: TodosService

	beforeEach(() => {
		service = new TodosService()
	})

	it("returns seeded todos", () => {
		const todos = service.findAll()
		expect(todos).toHaveLength(2)
		expect(todos.map(t => t.title)).toEqual(["First todo example", "Second todo example"])
	})

	it("creates with incremental id and defaults completed=false", () => {
		const created = service.create({ title: "New todo" })
		expect(created).toEqual(
			expect.objectContaining({
				id: 3,
				title: "New todo",
				completed: false,
			})
		)
		expect(service.findAll()).toHaveLength(3)
	})

	it("finds one by id or throws", () => {
		expect(service.findOne(1).title).toBe("First todo example")
		expect(() => service.findOne(999)).toThrow(NotFoundException)
	})

	it("replaces a todo", () => {
		const replaced = service.replace(1, { title: "Replaced", completed: true })
		expect(replaced).toEqual({ id: 1, title: "Replaced", completed: true })
		expect(service.findOne(1)).toEqual(replaced)
	})

	it("updates selected fields on a todo", () => {
		const updated = service.update(2, { completed: false })
		expect(updated).toEqual({ id: 2, title: "Second todo example", completed: false })
	})

	it("removes a todo and rejects subsequent lookups", () => {
		service.remove(1)
		expect(() => service.findOne(1)).toThrow(NotFoundException)
		expect(service.findAll()).toHaveLength(1)
	})
})

