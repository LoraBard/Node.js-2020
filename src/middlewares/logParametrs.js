const logger = require('../utils/logger');

const logParametrs = (req, res, next) => {
  const { method, url, body, query } = req;

  const { statusCode } = res;
  logger.log({
    level: 'info',
    message: `url: ${url} query: ${JSON.stringify(
      query
    )} body: ${JSON.stringify(body)}`,
    additional: `method: ${method} status: ${statusCode}`
  });

  next();
};

module.exports = logParametrs;
