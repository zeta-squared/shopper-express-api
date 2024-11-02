import { ValidationError, KeywordDefinition } from 'ajv';
import { User } from '../db/sequelize.mjs';

export const uniqueUsername: KeywordDefinition = {
	keyword: "uniqueUsername",
	type: "string",
	schemaType: "boolean",
	validate: validate_username,
	error: {message: "Username already in use."},
	async: true
}

export const uniqueEmail: KeywordDefinition = {
	keyword: "uniqueEmail",
	type: "string",
	schemaType: "boolean",
	validate: validate_email,
	error: {message: "Email already in use."},
	async: true
}

async function validate_username(schema: any, data: string): Promise<boolean | ValidationError> {
	const user = await User.findOne({
		where: {username: data}
	});
	
	return user ? false : true;
}

async function validate_email(schema: any, data: string): Promise<boolean | ValidationError> {
	const user = await User.findOne({
		where: {email: data}
	});

	return user ? false : true;
}
