import express, { type ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';

import { StatusCode } from './types/statusCodes';
import { apiPrefix } from './constants';
import indexRoute from './routes/index';
import apiRoute from './routes/api';

import type { ErrorWithServerStatusCode } from './types/errors';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/', indexRoute);
app.use(`/${apiPrefix}`, apiRoute);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  const err = new Error() as ErrorWithServerStatusCode;
  err.status = StatusCode.NotFound;
  next(err);
});

// error handler
app.use(function (err: Partial<ErrorWithServerStatusCode>, _req, res, _next) {
  res.sendStatus(err.status || StatusCode.InternalServerError);
} as ErrorRequestHandler);

export default app;
