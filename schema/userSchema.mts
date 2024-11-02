import { JSONSchemaType } from 'ajv';
import { JTDSchemaType } from 'ajv/dist/jtd.js';

interface UserLoad {
	id?: number,
	username: string,
	email: string,
	password: string,
	avatar_url?: string,
}

interface UserDump {
	id: number,
	username: string,
	email: string,
	avatar_url?: string,
}

export const userSchema: JSONSchemaType<UserLoad> = {
	$async: true,
	type: "object",
	properties: {
		id: {type: "integer", nullable: true},
		username: {type: "string", minLength: 3, maxLength: 64, uniqueUsername: true},
		email: {type: "string", maxLength: 128, format: "email", uniqueEmail: true},
		password: {type: "string", minLength: 3},
		avatar_url: {type: "string", nullable: true}
	},
	required: ["username", "email", "password"],
	additionalProperties: false
};

export const userDumpSchema: JTDSchemaType<UserDump> = {
	properties: {
		id: {type: "int32"},
		username: {type: "string"},
		email: {type: "string"},
	},
	optionalProperties: {
		avatar_url: {type: "string"}
	}
}
