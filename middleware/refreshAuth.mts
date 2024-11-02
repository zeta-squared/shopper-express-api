import { RouteError } from '../api.mjs';
import { Request, NextFunction } from 'express';
import { Token } from '../db/sequelize.mjs';


async function refreshAuth(accessTokenJWT: string, req: Request, next: NextFunction): Promise<any> {
	let token;

	try {
		token = await Token.fromJWT(accessTokenJWT) as Token;
	} catch (error) {
		return new RouteError(400, 'Bad Reqest', error.errors);
	}

	if (token) {
		let refreshToken;
		if (!(refreshToken = req.cookies.refresh_token)) {
			refreshToken = req.body.refresh_token;
		}

		const date = new Date();
		const tokenDate = new Date(token.refreshExpiration as Date);
		if (token.refreshToken === refreshToken && tokenDate > date) {
			return await token.$get('user');
		} else if (tokenDate > date) {
			return new RouteError(401, 'Unauthorized', 'Invalid refresh token');
		}

		Token.destroy({
			where: {userId: token.dataValues.userId}
		});
		
		return new RouteError(401, 'Unauthorized', 'Expired refresh token, all user tokens have been revoked');
	}

	return new RouteError(401, 'Unauthorized', 'Invalid access token');
}

export default refreshAuth;
