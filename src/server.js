import cors from 'cors';
import express from 'express';
import pino from 'pino-http';
import { DATA } from './utils/DATA.js';
import { env } from './utils/env.js';

export const startServer = () => {
  const app = express();

  const loger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  app.use(loger);
  app.use(cors());
  app.use(express.json());

  //   routes
  app.get('/products', async (req, res) => {
    // const data = await ProductsCollection.find();
    const data = await DATA();
    res.json({
      status: 200,
      message: `Seccessfully found products`,
      data,
    });
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `${res.url} not found`,
    });
  });

  app.use((error, req, res, next) => {
    res.status(500).json({
      message: error.message,
    });
  });

  const port = Number(env('PORT', 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
};
