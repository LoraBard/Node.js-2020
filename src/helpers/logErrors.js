const logger = require('../utils/logger');

const logErrors = (error, req, res, next) => {
  if (error) {
    const { method, url, body, query } = req;

    logger.log({
      level: 'error',
      message: `url: ${url} query: ${JSON.stringify(
        query
      )} body: ${JSON.stringify(body)} error: ${error.message}`,
      additional: `method: ${method}`
    });
    return next(error);
  }
  return next();
};

module.exports = logErrors;
