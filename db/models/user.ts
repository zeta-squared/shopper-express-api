/** 
 * I have commented out features that are irrelevant to @ariga/ts-atlas-provider-sequelize
 * so that I can just generate a migration file for the db. Otherwise, all functionality is
 * preserved in the files that are served with .mts extensions.
 */
import { scryptSync, randomBytes } from 'node:crypto';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
//import { RouteError } from '../../api.mjs';
import Token from './token';
import ShoppingList from './shoppingList';

@Table({timestamps: false, tableName: 'user'})
export default class User extends Model {
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	id: number 

	@Column({
		type: DataType.STRING(64),
		allowNull: false,
		unique: true,
	})
	username: string

	@Column({
		type: DataType.STRING(128),
		allowNull: false,
		unique: true,
	})
	email: string

	@Column({
		type: DataType.STRING(256),
	})
	get password(): string {
		return this.getDataValue('password') as string;
	}

	set password(password: string) {
		const salt: string = randomBytes(16).toString('base64');
		const passwordHash: string = scryptSync(password, salt, 128).toString('base64');
		this.setDataValue('password', `${salt}$${passwordHash}`)
	}

	@HasMany(() => Token)
	token: Model 

	@HasMany(() => ShoppingList)
	shoppingList: Model

	verifyPassword(password: string): boolean {
		const [salt, passwordHash] = this.getDataValue('password').split('$');
		return passwordHash === scryptSync(password, salt, 128).toString('base64');
	}

	/*
	async getShoppingList(): Promise<ShoppingList | null | RouteError> {
		try {
			let shoppingList = await ShoppingList.findOne({
				where: {userId: this.getDataValue('id')},
			});

			if (shoppingList?.dataValues?.items) {
				shoppingList.dataValues.items = JSON.parse(shoppingList.items.toString());

				return shoppingList;
			}

			return null;
		} catch(error) {
			return new RouteError(400, 'Bad Request', error.errors);
		}
	}
	*/
}
