const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const handleError = require('./helpers/handleErrors');
const logger = require('./utils/logger');

const exit = process.exit;

process.on('unhandledRejection', reason => {
  logger.logger.log('error', `Unhandle rejection: ${reason.message}`);
  exit(1);
});

process.on('uncaughtException', error => {
  logger.logger.log('error', `Captured uncaught error: ${error.message}`);
  exit(1);
});

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use(logger.logParams);

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
  return next({
    statusCode: 404,
    message: 'Not found'
  });
});
app.use(logger.logError);
app.use(handleError);

module.exports = app;
