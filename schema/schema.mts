import { Ajv } from 'ajv';
import _addFormats from 'ajv-formats';
import { uniqueUsername, uniqueEmail } from './validators.mjs';
import { userSchema } from './userSchema.mjs';
import { shoppingListLoadSchema } from './shoppingListSchema.mjs';

const ajv = new Ajv({allErrors: true});
const addFormats = _addFormats as unknown as typeof _addFormats.default;
addFormats(ajv);
ajv.addKeyword(uniqueUsername);
ajv.addKeyword(uniqueEmail);

export const UserSchema = ajv.compile(userSchema);
export const ShoppingListSchema = ajv.compile(shoppingListLoadSchema);
