const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const handleError = require('./helpers/handleErrors');
const logger = require('./utils/logger');
const logErrors = require('./helpers/logErrors');
const logParams = require('./helpers/logParametrs');
const createError = require('./helpers/createError');
const exit = process.exit;

process.on('unhandledRejection', error => {
  logger.log('error', `Unhandle rejection: ${error.message}`);
  exit(1);
});

process.on('uncaughtException', error => {
  logger.log('error', `Captured uncaught error: ${error.message}`);
  exit(1);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logParams);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use('/users', userRouter);

app.use('*', (req, res, next) => {
  return next(createError.notFound('Not found'));
});

app.use(logErrors);

app.use(handleError);

module.exports = app;
