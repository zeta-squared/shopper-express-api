import { NextFunction } from 'express'
import { User, Token } from '../db/sequelize.mjs';
import { RouteError } from '../api.mjs';


async function tokenAuth(accessTokenJWT: string): Promise<User | RouteError> {
	try {
		const token = await Token.fromJWT(accessTokenJWT) as Token;
		const date = new Date();
		const tokenDate = new Date(token.accessExpiration as Date);
		if (token && tokenDate > date) {
			const user = await token.$get('user') as User;

			return user;
		}

		return new RouteError(401, 'Unauthorized', 'Invalid access token');
	} catch(error) {
		return new RouteError(400, 'Bad Request', error.errors);
	}
}

export default tokenAuth;
