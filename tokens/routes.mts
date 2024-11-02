/** Token Route
 *
 * This route contains all end points related to tokens including;
 * issuing a new access and refresh token, refreshing an existing
 * access token and revoking an access token.
 *
 */
import { RouteError } from '../api.mjs';
import { Router, Request, Response, NextFunction } from 'express';
import { Token } from '../db/sequelize.mjs';
import basicAuth from '../middleware/basicAuth.mjs';
import refreshAuth from '../middleware/refreshAuth.mjs';
import tokenAuth from '../middleware/tokenAuth.mjs';
import tokenResponse from '../middleware/tokenResponse.mjs';


// initialise and export router instance
export const tokens = Router();


/** Issue a new access and refresh token
 */
tokens.post('/tokens', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const user = await basicAuth(req);
	if (user instanceof RouteError) {
		return next(user);
	}
	const token = await user.$create('token', {userId: user.dataValues.id}) as Token;
	await token.generate();

	return tokenResponse(token, res);
});


/** Refresh an access token
 */
tokens.put('/tokens', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const accessTokenJWT = req.get('Authorization')?.split(' ')[1] as string;
	const user = await refreshAuth(accessTokenJWT, req, next);
	Token.fromJWT(accessTokenJWT).then((value: Token) => {value.destroy()});
	const token = await user.$create('token', {userId: user.dataValues.id}) as Token;
	await token.generate();

	return tokenResponse(token, res);
});


/** Revoke an Access Token
 */
tokens.delete('/tokens', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const accessTokenJWT = req.get('Authorization')?.split(' ')[1] as string;
	const user = await tokenAuth(accessTokenJWT);
	if (user instanceof RouteError) {
		return next(user);
	}

	Token.fromJWT(accessTokenJWT).then((value: Token) => {value.destroy()});

	return res.status(200).send({});
});
