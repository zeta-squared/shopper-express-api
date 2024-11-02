import { apiConfig } from '../../config/config.js';
import { randomBytes } from 'node:crypto';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user.mjs';

@Table({timestamps: false, tableName: 'token'})
export default class Token extends Model {
	@Column({
		primaryKey: true,
		type: DataType.INTEGER,
		autoIncrement: true,
	})
	id: number 

	@Column({
		type: DataType.STRING(64),
		allowNull: true,
	})
	accessToken: string | null

	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	accessExpiration: Date | null

	@Column({
		type: DataType.STRING(64),
		allowNull: true,
	})
	refreshToken: string | null

	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	refreshExpiration: Date | null

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false,
	})
	userId: number

	@BelongsTo(() => User)
	user: Model

	accessTokenJWT(): string {
		return jwt.sign(
			{accessToken: this.getDataValue('accessToken')},
			apiConfig.SECRET_KEY
		);
	}

	async generate(): Promise<void> {
		// the time delta for the refresh token should be placed in an environment variable
		const [ access, refresh ] = [new Date(), new Date()];
		access.setUTCMinutes(access.getUTCMinutes() + parseInt(apiConfig.ACCESS_TOKEN_DURATION));
		refresh.setUTCDate(refresh.getUTCDate() + parseInt(apiConfig.REFRESH_TOKEN_DURATION));
		const accessExpiration = access.toISOString();
		const refreshExpiration = refresh.toISOString();

		await this.update({
			accessToken: randomBytes(32).toString('base64'),
			accessExpiration: accessExpiration,
			refreshToken: randomBytes(32).toString('base64'),
			refreshExpiration: refreshExpiration,
		})

		return;
	}

	static async fromJWT(accessTokenJWT: string): Promise<Token | null | JsonWebTokenError> {
		const verify = jwt.verify(accessTokenJWT, apiConfig.SECRET_KEY) as JwtPayload;
		const token = await Token.findOne({
			where: {accessToken: verify?.accessToken}
		}) as Token;
		return token || null;
	}
}
