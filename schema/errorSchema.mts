//import { JTDSchemaType } from 'ajv/dist/jtd.js';

interface Error {
	code: number,
	name: string,
	description: string,
	messages?: Record<string, string>,
}

/*
export const errorSchema: JTDSchemaType<Error> = {
	properties: {
		code: {type: "int32"},
		name: {type: "string"},
		description: {type: "string"}
	},
	optionalProperties: {
		messages: {values: {type: "string"}}
	}
}
*/
