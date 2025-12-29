import * as todos from "./todos"

export * from "./todos"

export const schema = {
	...todos,
}

export type Schema = typeof schema

export default schema
