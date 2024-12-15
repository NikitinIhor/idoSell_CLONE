import cors from 'cors';
import express from 'express';

import { env } from './utils/env.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { loger } from './middlewares/loger.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import productsRouter from './routers/Products.js';
import authRouter from './routers/auth.js';

export const startServer = () => {
  const app = express();

  app.use(loger);
  app.use(cors());
  app.use(express.json());

  app.use('/auth', authRouter);

  app.use('/products', productsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const port = Number(env('PORT', 3000));

  app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}`)
  );
};
