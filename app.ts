import express, { ErrorRequestHandler } from 'express';
import dotenv from 'dotenv';

import type { ErrorWithServerStatusCode } from './types/errors';
import { StatusCode } from './types/statusCodes';

import indexRoute from './routes/index';

dotenv.config();

const app = express();
app.use('/', indexRoute);

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  const err = new Error() as ErrorWithServerStatusCode;
  err.status = StatusCode.NotFound;
  next(err);
});

// error handler
app.use(function (err: Partial<ErrorWithServerStatusCode>, _req, res, _next) {
  res.sendStatus(err.status || 500);
} as ErrorRequestHandler);

export default app;
