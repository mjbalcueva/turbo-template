import * as auth from "./auth.js"
import * as todos from "./todos.js"

export * from "./todos.js"
export * from "./auth.js"

export const schema = {
	...todos,
	...auth,
}

export type Schema = typeof schema

export default schema
