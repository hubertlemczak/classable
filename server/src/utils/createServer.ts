import express from 'express';
require('express-async-errors');
import cors from 'cors';
import morgan from 'morgan';

import api from '../api';
import errorHandler from '../api/errors';

export default function createServer() {
  const app = express();

  app.disable('x-powered-by');

  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use('/api', api);

  app.use(errorHandler);

  return app;
}
