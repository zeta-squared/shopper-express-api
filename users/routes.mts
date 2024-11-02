/** User Route
 *
 * This route contains all end points related to users including;
 * registering a new user and retrieving information about an existing
 * user.
 *
 */
import { RouteError } from '../api.mjs';
import { Router, Request, Response, NextFunction } from 'express';
import { UserSchema } from '../schema/schema.mjs';
import { UserSerializer } from '../schema/serializer.mjs';
import { User } from '../db/sequelize.mjs';
import tokenAuth from '../middleware/tokenAuth.mjs';


export const users = Router(); // initialise and export express router


/** Register a New User
 */
users.post('/users', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	// perhaps move this to some neat middleware
	try {
		const validate = await UserSchema(req.body);
		const user = await User.create(req.body);

		return res.status(200).send(UserSerializer(user.dataValues));
	} catch (error) {
		let messages: Record<string, string> = {};
		error?.errors?.map((e: Record<string, string>): void => {
			messages[e.instancePath.slice(1)] = e.message
		});

		return next(
			new RouteError(400, 'Bad Request', 'Validation error', messages)
		);
	}
});


/** Retrieve a User by Username/Retrieve authentiated user information
 */
users.get('/users/:username', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const username = req.params.username;
	if (username === 'me') {
		const accessTokenJWT = req.get('Authorization')?.split(' ')[1] as string;
		const user = await tokenAuth(accessTokenJWT);
		if (user instanceof RouteError) {
			return next(user);
		}

		return res.status(200).send(UserSerializer(user.dataValues));
	}

	// can this be moved to middleware?
	try {
		const user = await User.findOne({
			where: {username: req.params.username},
		});
		if (user) {
			return res.status(200).send(UserSerializer(user.dataValues));
		} else {
			return next(
				new RouteError(404, 'Not Found', 'User not found')
			);
		}
	} catch (error) {
		return next(
			new RouteError(400, 'Bad Request', error.errors)
		);
	}
});
