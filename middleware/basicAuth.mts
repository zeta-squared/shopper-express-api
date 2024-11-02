import { Request, NextFunction } from 'express';
import { User } from '../db/sequelize.mjs';
import { RouteError } from '../api.mjs';


async function basicAuth(req: Request): Promise<User | RouteError> {
	try {
		const b64 = atob(req.get('Authorization')?.split(' ')[1] as string);
		const [ username, password ] = b64.split(':');
		if (username && password) {
			const user = await User.findOne({where: {username: username}}) as User;
			if (user && user.verifyPassword(password)) {
				return user;
			}

		}
		return new RouteError(401, 'Unauthorized', 'Invalid username or password');
	} catch (error) {
		return new RouteError(400, 'Bad Request', error.errors);
	}
}

export default basicAuth;
