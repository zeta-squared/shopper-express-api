import { Ajv } from 'ajv/dist/jtd.js';
import { userDumpSchema } from './userSchema.mjs';
import { shoppingListDumpSchema } from './shoppingListSchema.mjs';

const ajv = new Ajv();

export const UserSerializer = ajv.compileSerializer(userDumpSchema);
export const ShoppingListSerializer = ajv.compileSerializer(shoppingListDumpSchema);
