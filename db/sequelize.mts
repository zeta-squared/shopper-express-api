import { apiConfig } from '../config/config.js';
import { Sequelize } from 'sequelize-typescript';
import User from './models/user.mjs';
import Token from './models/token.mjs';
import ShoppingList from './models/shoppingList.mjs';
//import ShoppingListModel from './models/shoppingList.js';

const sequelize = new Sequelize({
	storage: apiConfig.SEQUELIZE_DB_PATH,
	dialect: apiConfig.SEQUELIZE_DIALECT,
	models: [User, Token, ShoppingList],
});

export { sequelize, User, Token, ShoppingList};
