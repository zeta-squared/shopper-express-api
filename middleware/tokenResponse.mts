import { Response } from 'express';
import { Token } from '../db/sequelize.mjs';


function tokenResponse(token: Token, res: Response): any {
	res.status(200).cookie(
		'refresh_token',
		token.refreshToken,
		{
			path: 'http://localhost:5000/api/tokens', // the path here should be generated dynamically
			secure: true,
			httpOnly: true,
			sameSite: 'lax'
		}
	);

	return res.send({
		'access_token': token.accessTokenJWT(),
		'refresh_token': null
	});
}

export default tokenResponse;
