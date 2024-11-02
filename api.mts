import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: 'json' };
import { apiConfig } from './config/config.js';
import { Request, Response, NextFunction } from 'express';
import { User } from './db/sequelize.mjs';
import { tokens } from './tokens/routes.mjs';
import { users } from './users/routes.mjs';
import { shopping } from './shopping/routes.mjs';


export class RouteError extends Error {
	constructor(code: number, name: string, description: string, messages: any = {}) {
		super(messages);
		this.code = code;
		this.name = name;
		this.description = description;
		this.messages = messages;
	}
	
	code: number;
	name: string;
	description: string;
	messages: Record<string, string>;
}


// instatiate express
const api = express();
api.use(express.json());
api.use(express.urlencoded());
api.use(cookieParser());
api.use(cors({origin: true, credentials: true}));


// load routes
api.get('/', (req: Request, res: Response): any => {
	return res.redirect('/api/docs');
});
api.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
api.use('/api', users);
api.use('/api', tokens);
api.use('/api', shopping);


// error handler
api.use((err: RouteError, req: Request, res: Response, next: NextFunction): any => {
	console.log('sending error response');
	return res.status(err.code).send({
		code: err.code,
		name: err.name,
		description: err.description,
		messages: err.messages ? err.messages : {},
	});
});


api.listen(apiConfig.EXPRESS_PORT, () => {
	console.log(`Listening on port ${apiConfig.EXPRESS_PORT}`);
});
