import { Table, Column, Model, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript';
import User from './user.mjs';

@Table({timestamps: false, tableName: 'shopping_list'})
export default class ShoppingList extends Model {
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	id: number

	@Column({
		type: DataType.BLOB,
		allowNull: true,
	})
	items: Record<string,number>

	@ForeignKey(() => User)
	@Column
	userId: number

	@BelongsTo(() => User)
	user: Model 
}
