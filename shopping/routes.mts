import { Router, Request, Response, NextFunction } from 'express';
import { RouteError } from '../api.mjs';
import tokenAuth from '../middleware/tokenAuth.mjs';
import { ShoppingListSerializer } from '../schema/serializer.mjs';
import { ShoppingList } from '../db/sequelize.mjs';


export const shopping = Router();


/** Get a User's Shopping List
 */
shopping.get('/shopping', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const accessTokenJWT = req.get('Authorization')?.split(' ')[1] as string;
	const user = await tokenAuth(accessTokenJWT);
	if (user instanceof RouteError) {
		return next(user);
	}

	const shoppingList = await user.getShoppingList();
	if (shoppingList instanceof RouteError) {
		return next(shoppingList);
	}

	if (shoppingList) {
		return res.status(200).send(ShoppingListSerializer(shoppingList.dataValues));
	} else {
		next(
			new RouteError(404, 'Not Found', 'Shopping list not found')
		);
	}
});


/** Create or Update a User's Shopping List
 */
shopping.post('/shopping', async(req: Request, res: Response, next: NextFunction): Promise<any> => {
	const accessTokenJWT = req.get('Authorization')?.split(' ')[1] as string;
	const user = await tokenAuth(accessTokenJWT);
	if (user instanceof RouteError) {
		return next(user);
	}

	let shoppingList = await user.getShoppingList();
	if (shoppingList instanceof RouteError) {
		return next(shoppingList);
	}

	if (!shoppingList) {
		shoppingList = await ShoppingList.create({
			items: Buffer.from(JSON.stringify(req.body.items)),
			userId: user?.dataValues.id
		});
		shoppingList.items = req.body.items;

		return res.status(201).send(ShoppingListSerializer(shoppingList.dataValues));
	}

	await shoppingList.update({
		items: Buffer.from(JSON.stringify(req.body.items)),
	});
	shoppingList.items = req.body.items;

	return res.status(200).send(ShoppingListSerializer(shoppingList));
});
