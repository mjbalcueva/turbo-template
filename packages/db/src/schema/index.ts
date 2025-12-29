import * as todos from "./todos.js"

export * from "./todos.js"

export const schema = {
	...todos,
}

export type Schema = typeof schema

export default schema
