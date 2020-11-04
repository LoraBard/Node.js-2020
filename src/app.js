const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/users/login.router');
const {
  handleErrors,
  logErrors,
  logParametrs,
  auth
} = require('./middlewares');
const logger = require('./utils/logger');
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

app.use(logParametrs);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);

app.use('/users', auth, userRouter);

app.use('/boards', auth, boardRouter);

app.use('/users', auth, userRouter);

app.use('*', auth, (req, res, next) => {
  return next(createError.notFound('Not found'));
});

app.use(logErrors);

app.use(handleErrors);

module.exports = app;
