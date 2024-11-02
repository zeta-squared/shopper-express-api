import { JSONSchemaType } from 'ajv';
import { JTDSchemaType } from 'ajv/dist/jtd.js';


interface ShoppingList {
	id?: number,
	items: Record<string,number>,
}

export const shoppingListLoadSchema = {
	type: "object",
	properties: {
		id: {type: "integer", nullable: true},
		items: {
			type: "object",
			properties: {
				item: {type: "string"},
				count: {type: "integer", minimum: 0},
			},
		},
	},
	required: ["items"],
	additionalProperties: false
};

export const shoppingListDumpSchema: JTDSchemaType<ShoppingList> = {
	properties: {
		items: {values: {type: "int32"}},
	},
	optionalProperties: {
		id: {type: "int32"},
	}
}
