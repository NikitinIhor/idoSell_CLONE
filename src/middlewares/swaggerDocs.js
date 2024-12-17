import createHttpError from 'http-errors';
import { readFileSync } from 'node:fs';
import * as path from 'node:path';
import swaggerUI from 'swagger-ui-express';

export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');

export const swaggerDocs = () => {
  try {
    const swaggerDoc = readFileSync(SWAGGER_PATH, 'utf-8');
    return [...swaggerUI.serve, swaggerUI.setup(JSON.parse(swaggerDoc))];
  } catch (err) {
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
