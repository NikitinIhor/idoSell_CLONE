import { MongoDB } from './db/MongoDB.js';
import { startServer } from './server.js';

const bootstrap = async () => {
  await MongoDB();
  startServer();
};

bootstrap();
