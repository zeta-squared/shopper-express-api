/**
 * This file is kept as common js so that it can be imported using ES6 style
 * module imports in the db related files.
 */
import path from 'path';
import dotenv from 'dotenv';

const baseDir: string = path.resolve('.');
export const apiConfig = dotenv.config({path: baseDir + '/config/.env'}).parsed as Record<string, any>;
apiConfig.SEQUELIZE_DB_PATH = baseDir + apiConfig.SEQUELIZE_DB_PATH;
apiConfig.DB_MODELS = baseDir + apiConfig.DB_MODELS;
